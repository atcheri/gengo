import { redirect } from '@sveltejs/kit';
import { getLesson, getUserProgress } from '$lib/server/db/queries.js';
import type { PageServerLoad } from './$types.js';
import { StatusCodes } from 'http-status-codes';
import crypto from 'crypto';

export const load: PageServerLoad = (async ({ locals, params }) => {
	const session = await locals.auth();
	if (!session || !session.user || !session.user.email) {
		return redirect(StatusCodes.UNAUTHORIZED, '/');
	}

	if (!params.id) {
		return redirect(StatusCodes.NOT_FOUND, '/learn');
	}

	const userId = crypto.createHash('md5').update(session.user.email).digest('hex');
	const [lesson, userProgress] = await Promise.all([
		getLesson(userId, Number(params.id)),
		getUserProgress(userId)
	]);

	if (!lesson || !userProgress) {
		return redirect(StatusCodes.UNAUTHORIZED, '/learn');
	}

	const initialPercentage =
		(lesson.challenges.filter((challenge) => challenge.completed).length /
			lesson.challenges.length) *
		100;

	return { lesson, userProgress, initialPercentage };
}) satisfies PageServerLoad;
