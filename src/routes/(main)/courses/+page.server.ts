import { getCourses, getUserProcess } from '$lib/db/queries.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.auth();
	const [courses, userProgress] = await Promise.all([
		getCourses(),
		getUserProcess(session?.user?.id)
	]);

	return {
		activeCourseId: userProgress?.activeCourseId,
		courses
	};
};
