import { db } from '$lib/server/db/drizzle.js';
import { getUserProgress, getUserSubscription } from '$lib/server/db/queries.js';
import { challengeProgress, challenges, userProgress } from '$lib/server/db/schema.js';
import { and, eq } from 'drizzle-orm';

export const reduceHearts = async (userId: string, challengeId: number) => {
	const currentUserProgress = await getUserProgress(userId);

	const challenge = await db.query.challenges.findFirst({
		where: eq(challenges.id, challengeId)
	});

	if (!challenge) {
		throw new Error('Challenge not found');
	}

	const existingChallengeProgress = await db.query.challengeProgress.findFirst({
		where: and(eq(challengeProgress.userId, userId), eq(challengeProgress.challengeId, challengeId))
	});

	const isPractice = !!existingChallengeProgress;

	if (isPractice) {
		return;
		// throw Error('practice');
	}

	if (!currentUserProgress) {
		throw new Error('User progress not found');
	}

	if (currentUserProgress.hearts === 0) {
		return;
		// throw Error('hearts');
	}

	const userSubscription = await getUserSubscription(userId);
	if (!userSubscription?.isActive) {
		throw Error('subscription');
	}

	await db
		.update(userProgress)
		.set({
			hearts: Math.max(currentUserProgress.hearts - 1, 0)
		})
		.where(eq(userProgress.userId, userId));
};
