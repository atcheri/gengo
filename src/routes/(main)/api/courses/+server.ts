import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';
import { StatusCodes } from 'http-status-codes';
import { upsertUserProgress } from './actions.js';

export const POST: RequestHandler = async ({ locals, request }) => {
	const session = await locals.auth();
	if (!session || !session.user) {
		return error(StatusCodes.FORBIDDEN, "You don't have the permission to perform the action");
	}

	const { courseId } = await request.json();
	await upsertUserProgress(session.user, courseId);

	return json({ ok: true });
};
