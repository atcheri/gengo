import { signIn } from '../../../auth.js';
import type { Actions } from './$types.js';

export const actions: Actions = { default: signIn };
