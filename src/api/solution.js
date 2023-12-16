import promptSync from 'prompt-sync';
import { sendSolution } from './api.js';

const [fDay, fPart, fAns] = process.argv.slice(2);

const prompt = promptSync({ sigint: true });

const day = fDay ?? prompt("Which day: ");
const part = fPart ?? prompt("Which part: ");
const answer = fAns ?? prompt("Your answer: ");

sendSolution(2023,day, part, answer)
