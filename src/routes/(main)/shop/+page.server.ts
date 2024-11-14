import { getUserProgress } from '$lib/server/db/queries.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../courses/$types.js';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import type { courses, userProgress } from '$lib/server/db/schema.js';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	if (!session || !session.user || !session.user.email) {
		return redirect(StatusCodes.UNAUTHORIZED, '/');
	}

	const userId = crypto.createHash('md5').update(session.user.email).digest('hex');
	const up = await getUserProgress(userId);

	if (!up || !up.activeCourse) {
		redirect(StatusCodes.NOT_FOUND, '/courses');
	}

	return {
		isPro: false,
		userProgress: up as Pick<typeof userProgress.$inferSelect, 'hearts' | 'points'> & {
			activeCourse: typeof courses.$inferSelect;
		}
	};
};
