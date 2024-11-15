import { getTopTenUsers, getUserProgress, getUserSubscription } from '$lib/server/db/queries.js';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from '../courses/$types.js';
import crypto from 'crypto';
import { StatusCodes } from 'http-status-codes';
import type { courses, userProgress } from '$lib/server/db/schema.js';

export const load: PageServerLoad = async ({ locals, url }) => {
	const status = url.searchParams.get('status') as 'success' | 'cancel';
	const session = await locals.auth();
	if (!session || !session.user || !session.user.email) {
		return redirect(StatusCodes.TEMPORARY_REDIRECT, '/');
	}

	const userId = crypto.createHash('md5').update(session.user.email).digest('hex');
	const [up, us, lb] = await Promise.all([
		getUserProgress(userId),
		getUserSubscription(userId),
		getTopTenUsers()
	]);

	if (!up || !up.activeCourse) {
		redirect(StatusCodes.TEMPORARY_REDIRECT, '/courses');
	}

	return {
		status,
		isPro: !us ? false : us.isActive,
		userProgress: up as Pick<typeof userProgress.$inferSelect, 'hearts' | 'points'> & {
			activeCourse: typeof courses.$inferSelect;
		},
		leaderboard: lb
	};
};
