import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';
import { upsertChallengeProgress } from './actions.js';

export const POST: RequestHandler = async ({ locals, request }) => {
	try {
		const session = await locals.auth();
		if (!session || !session.user || !session.user.email) {
			return error(StatusCodes.FORBIDDEN, "You don't have the permission to perform the action");
		}

		const userId = crypto.createHash('md5').update(session.user.email).digest('hex');
		const { challengeId } = await request.json();
		await upsertChallengeProgress(userId, challengeId);

		return json({ ok: true });
	} catch (err) {
		if (err instanceof Error) {
			return error(StatusCodes.BAD_REQUEST, err.message);
		}

		return error(StatusCodes.BAD_REQUEST, 'bad request. try again later');
	}
};
