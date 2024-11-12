import { getCourses, getUserProgress } from '$lib/server/db/queries.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types.js';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (!session || !session.user || !session.user.email) {
		return redirect(StatusCodes.UNAUTHORIZED, '/');
	}

	const userId = crypto.createHash('md5').update(session.user.email).digest('hex');
	const [courses, userProgress] = await Promise.all([getCourses(), getUserProgress(userId)]);

	return {
		activeCourseId: userProgress?.activeCourseId,
		courses
	};
};
