import { db } from './drizzle.js';

export const getCourses = async () => {
	const data = await db.query.courses.findMany();

	return data;
};
