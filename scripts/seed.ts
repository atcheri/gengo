import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '../src/lib/server/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
	try {
		console.log('Seeding database');

		await db.delete(schema.courses);
		await db.delete(schema.userProgress);

		await db.insert(schema.courses).values([
			{
				id: 1,
				title: 'Spanish',
				imageSrc: '/images/icons/es.svg'
			},
			{
				id: 2,
				title: 'Italian',
				imageSrc: '/images/icons/it.svg'
			},
			{
				id: 3,
				title: 'French',
				imageSrc: '/images/icons/fr.svg'
			},
			{
				id: 4,
				title: 'Japanese',
				imageSrc: '/images/icons/jp.svg'
			}
		]);

		console.log('Seeding finished');
	} catch (error) {
		console.error(error);
		throw new Error('Failed to seed the database');
	}
};

main();
