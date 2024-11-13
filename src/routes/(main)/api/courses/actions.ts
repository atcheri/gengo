import { getCourseById, getUserProgress } from '$lib/server/db/queries.js';
import { userProgress } from '$lib/server/db/schema.js';
import { db } from '$lib/server/db/drizzle.js';
import type { User } from '@auth/sveltekit';
import crypto from 'crypto';

export const upsertUserProgress = async (user: User, courseId: number) => {
	const course = await getCourseById(courseId);

	if (!course) {
		throw new Error('Course not found');
	}

	// if (!course.units.length || !course.units[0].lessons.length) {
	//   throw new Error("Course is empty");
	// }

	if (!user.email) {
		throw Error('User must have an email address');
	}

	const userId = crypto.createHash('md5').update(user.email).digest('hex');
	const existingUserProgress = await getUserProgress(userId);

	if (existingUserProgress) {
		await db.update(userProgress).set({
			activeCourseId: courseId,
			userName: user.name || 'User',
			userImageSrc: user.image || '/images/mascot.svg'
		});
		return;
	}

	await db.insert(userProgress).values({
		userId,
		userEmail: user.email,
		activeCourseId: courseId,
		userName: user.name || 'User',
		userImageSrc: user.image || '/images/mascot.svg'
	});
};
