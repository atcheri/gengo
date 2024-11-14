import { STRIPE_WEBHOOK_SECRET } from '$env/static/private';
import { db } from '$lib/server/db/drizzle.js';
import { userSubscription } from '$lib/server/db/schema.js';
import { stripe } from '$lib/server/payment/stripe.js';
import { eq } from 'drizzle-orm';
import type Stripe from 'stripe';

export const handleStrieSubscriptionWebhook = async (body: string, signature: string) => {
	let event: Stripe.Event;

	try {
		event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
	} catch (error) {
		throw Error(
			`Webhook error: ${(error as Stripe.errors.StripeSignatureVerificationError).message}`
		);
	}

	const session = event.data.object as Stripe.Checkout.Session;
	const subscription = await stripe.subscriptions.retrieve(session.subscription as string);

	if (event.type === 'checkout.session.completed') {
		if (!session?.metadata?.userId) {
			throw Error('User ID is required');
		}

		await db.insert(userSubscription).values({
			userId: session.metadata.userId,
			stripeSubscriptionId: subscription.id,
			stripeCustomerId: subscription.customer as string,
			stripePriceId: subscription.items.data[0].price.id,
			stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
		});
	}

	if (event.type === 'invoice.payment_succeeded') {
		await db
			.update(userSubscription)
			.set({
				stripePriceId: subscription.items.data[0].price.id,
				stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000)
			})
			.where(eq(userSubscription.stripeSubscriptionId, subscription.id));
	}
};
