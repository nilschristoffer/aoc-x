import promptSync from 'prompt-sync';

import { getInput } from './api.js';

const [fDay] = process.argv.slice(2);


const prompt = promptSync({ sigint: true });

const day = fDay ?? prompt("Which day? ");

getInput(day);
