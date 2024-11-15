import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db/drizzle.js';
import {
	challengeProgress,
	courses,
	lessons,
	units,
	userProgress,
	userSubscription
} from '$lib/server/db/schema.js';

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
		where: eq(courses.id, courseId),
		with: {
			units: {
				orderBy: (units, { asc }) => [asc(units.order)],
				with: {
					lessons: {
						orderBy: (lessons, { asc }) => [asc(lessons.order)]
					}
				}
			}
		}
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

export const getCourseProgress = async (userId: string) => {
	const userProgress = await getUserProgress(userId);

	if (!userId || !userProgress?.activeCourseId) {
		return null;
	}

	const unitsInActiveCourse = await db.query.units.findMany({
		orderBy: (units, { asc }) => [asc(units.order)],
		where: eq(units.courseId, userProgress.activeCourseId),
		with: {
			lessons: {
				orderBy: (lessons, { asc }) => [asc(lessons.order)],
				with: {
					unit: true,
					challenges: {
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

	const firstUncompletedLesson = unitsInActiveCourse
		.flatMap((unit) => unit.lessons)
		.find((lesson) => {
			return lesson.challenges.some((challenge) => {
				return (
					!challenge.challengeProgress ||
					challenge.challengeProgress.length === 0 ||
					challenge.challengeProgress.some((progress) => progress.completed === false)
				);
			});
		});

	return {
		activeLesson: firstUncompletedLesson,
		activeLessonId: firstUncompletedLesson?.id
	};
};

export const getLesson = async (userId: string, id: number) => {
	if (!userId) {
		return null;
	}

	const courseProgress = await getCourseProgress(userId);

	const lessonId = id || courseProgress?.activeLessonId;

	if (!lessonId) {
		return null;
	}

	const data = await db.query.lessons.findFirst({
		where: eq(lessons.id, lessonId),
		with: {
			challenges: {
				orderBy: (challenges, { asc }) => [asc(challenges.order)],
				with: {
					challengeOptions: true,
					challengeProgress: {
						where: eq(challengeProgress.userId, userId)
					}
				}
			}
		}
	});

	if (!data || !data.challenges) {
		return null;
	}

	const normalizedChallenges = data.challenges.map((challenge) => {
		const completed =
			challenge.challengeProgress &&
			challenge.challengeProgress.length > 0 &&
			challenge.challengeProgress.every((progress) => progress.completed);

		return { ...challenge, completed };
	});

	return { ...data, challenges: normalizedChallenges };
};

export const getLessonPercentage = async (userId: string) => {
	const courseProgress = await getCourseProgress(userId);

	if (!courseProgress?.activeLessonId) {
		return 0;
	}

	const lesson = await getLesson(userId, courseProgress.activeLessonId);

	if (!lesson) {
		return 0;
	}

	const completedChallenges = lesson.challenges.filter((challenge) => challenge.completed);
	const percentage = Math.round((completedChallenges.length / lesson.challenges.length) * 100);

	return percentage;
};

const DAY_IN_MS = 86_400_000;
export const getUserSubscription = async (userId: string) => {
	const data = await db.query.userSubscription.findFirst({
		where: eq(userSubscription.userId, userId)
	});

	if (!data) return null;

	const isActive =
		data.stripePriceId && data.stripeCurrentPeriodEnd?.getTime() + DAY_IN_MS > Date.now();

	return {
		...data,
		isActive: !!isActive
	};
};
