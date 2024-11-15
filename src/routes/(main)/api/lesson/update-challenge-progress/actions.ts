import { db } from '$lib/server/db/drizzle.js';
import { getUserProgress, getUserSubscription } from '$lib/server/db/queries.js';
import { challengeProgress, challenges, userProgress } from '$lib/server/db/schema.js';
import { and, eq } from 'drizzle-orm';

export const upsertChallengeProgress = async (userId: string, challengeId: number) => {
	const currentUserProgress = await getUserProgress(userId);

	if (!currentUserProgress) {
		throw new Error('User progress not found');
	}

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
	const userSubscription = await getUserSubscription(userId);

	if (currentUserProgress.hearts === 0 && !isPractice && !userSubscription?.isActive) {
		throw Error('hearts');
	}

	if (isPractice) {
		await db
			.update(challengeProgress)
			.set({
				completed: true
			})
			.where(eq(challengeProgress.id, existingChallengeProgress.id));

		await db
			.update(userProgress)
			.set({
				hearts: Math.min(currentUserProgress.hearts + 1, 5),
				points: currentUserProgress.points + 10
			})
			.where(eq(userProgress.userId, userId));

		return;
	}

	await db.insert(challengeProgress).values({
		challengeId,
		userId,
		completed: true
	});

	await db
		.update(userProgress)
		.set({
			points: currentUserProgress.points + 10
		})
		.where(eq(userProgress.userId, userId));
};
