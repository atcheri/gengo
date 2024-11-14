import { getUserSubscription } from '$lib/server/db/queries.js';
import { stripe } from '$lib/server/payment/stripe.js';
import { absoluteUrl } from '$lib/utils.js';

export const createStripeUrl = async (userId: string, userEmail: string) => {
	const returnUrl = absoluteUrl('/shop');
	const successUrl = absoluteUrl('/shop?status=success');
	const cancelUrl = absoluteUrl('/shop?status=cancel');
	const userSubscription = await getUserSubscription(userId);

	if (userSubscription && userSubscription.stripeCustomerId) {
		const stripeSession = await stripe.billingPortal.sessions.create({
			customer: userSubscription.stripeCustomerId,
			return_url: returnUrl
		});

		return { data: stripeSession.url };
	}

	const stripeSession = await stripe.checkout.sessions.create({
		mode: 'subscription',
		payment_method_types: ['card'],
		customer_email: userEmail,
		line_items: [
			{
				quantity: 1,
				price_data: {
					currency: 'EUR',
					product_data: {
						name: 'Gengo Pro',
						description: 'Unlimited Hearts'
					},
					unit_amount: 2000, // $20.00 USD
					recurring: {
						interval: 'month'
					}
				}
			}
		],
		metadata: {
			userId
		},
		success_url: successUrl,
		cancel_url: cancelUrl
	});

	return stripeSession.url;
};
