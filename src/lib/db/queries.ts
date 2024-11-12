import { eq } from 'drizzle-orm';
import { db } from './drizzle.js';
import { courses, userProgress } from '$lib/db/schema.js';

export const getCourses = async () => {
	const data = await db.query.courses.findMany();

	return data;
};

export const getUserProcess = async (userId: string | undefined) => {
	if (!userId) {
		return undefined;
	}

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
