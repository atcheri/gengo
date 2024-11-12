import { getCourses } from '@db/queries.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async () => {
	return {
		activeCourseId: 1,
		courses: await getCourses()
	};
};
