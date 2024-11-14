import { MAX_HEARTS, POINTS_TO_REFILL } from '$lib/constants.js';
import { db } from '$lib/server/db/drizzle.js';
import { getUserProgress } from '$lib/server/db/queries.js';
import { userProgress } from '$lib/server/db/schema.js';
import { eq } from 'drizzle-orm';

export const refillHearts = async (userId: string) => {
	const currentUserProgress = await getUserProgress(userId);

	if (!currentUserProgress) {
		throw new Error('User progress not found');
	}

	if (currentUserProgress.hearts === MAX_HEARTS) {
		throw new Error('Hearts are already full');
	}

	if (currentUserProgress.points < POINTS_TO_REFILL) {
		throw new Error('Not enough points');
	}

	await db
		.update(userProgress)
		.set({
			hearts: MAX_HEARTS,
			points: currentUserProgress.points - POINTS_TO_REFILL
		})
		.where(eq(userProgress.userId, currentUserProgress.userId));

	return MAX_HEARTS;
};
