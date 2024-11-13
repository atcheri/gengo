import type { lessons, units } from './server/db/schema.js';

export type Lesson = typeof lessons.$inferSelect;
export type Unit = typeof units.$inferSelect;
