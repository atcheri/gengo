import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { StatusCodes } from 'http-status-codes';
import { handleStrieSubscriptionWebhook } from './actions.js';

export const POST: RequestHandler = async ({ request }) => {
	const body = await request.text();
	const signature = request.headers.get('Stripe-Signature');

	if (!signature) {
		error(StatusCodes.BAD_REQUEST, 'signature must be provided');
	}

	try {
		await handleStrieSubscriptionWebhook(body, signature);
		return json({ ok: true });
	} catch (err) {
		console.log('err:', err);
		if (err instanceof Error) {
			error(StatusCodes.BAD_REQUEST, err.message);
		}
		error(StatusCodes.BAD_REQUEST, 'something went wrong');
	}
};
