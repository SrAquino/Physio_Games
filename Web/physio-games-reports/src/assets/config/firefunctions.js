import app from "./firebase.js";

import { getFunctions } from 'firebase/functions';

export const functions = getFunctions(app);