import { STRIPE_API_KEY } from '$env/static/private';
import Stripe from 'stripe';

export const stripe = new Stripe(STRIPE_API_KEY, {
	apiVersion: '2024-10-28.acacia',
	typescript: true
});
