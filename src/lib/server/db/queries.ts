import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/drizzle.js';
import { challengeProgress, courses, units, userProgress } from '$lib/server/db/schema.js';

export const getCourses = async () => {
	const data = await db.query.courses.findMany();

	return data;
};

export const getUserProgress = async (userId: string) => {
	const data = await db.query.userProgress.findFirst({
		where: eq(userProgress.userId, userId),
		with: {
			activeCourse: true
		}
	});

	return data;
};

export const getCourseById = async (courseId: number) => {
	const data = await db.query.courses.findFirst({
		where: eq(courses.id, courseId)
		// TODO: populate units and lessons
	});

	return data;
};

export const getUnits = async (userId: string) => {
	const userProgress = await getUserProgress(userId);

	if (!userId || !userProgress?.activeCourseId) {
		return [];
	}

	const data = await db.query.units.findMany({
		orderBy: (units, { asc }) => [asc(units.order)],
		where: eq(units.courseId, userProgress.activeCourseId),
		with: {
			lessons: {
				orderBy: (lessons, { asc }) => [asc(lessons.order)],
				with: {
					challenges: {
						orderBy: (challenges, { asc }) => [asc(challenges.order)],
						with: {
							challengeProgress: {
								where: eq(challengeProgress.userId, userId)
							}
						}
					}
				}
			}
		}
	});

	const normalizedData = data.map((unit) => {
		const lessonsWithCompletedStatus = unit.lessons.map((lesson) => {
			if (lesson.challenges.length === 0) {
				return { ...lesson, completed: false };
			}

			const allCompletedChallenges = lesson.challenges.every((challenge) => {
				return (
					challenge.challengeProgress &&
					challenge.challengeProgress.length > 0 &&
					challenge.challengeProgress.every((progress) => progress.completed)
				);
			});

			return { ...lesson, completed: allCompletedChallenges };
		});

		return { ...unit, lessons: lessonsWithCompletedStatus };
	});

	return normalizedData;
};
