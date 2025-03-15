import { configDotenv } from 'dotenv';

configDotenv();

export const SYNC_INTERVAL = process.env.SYNC_INTERVAL;
export const SYNC_BATCH_SIZE = +process.env.SYNC_BATCH_SIZE;

export const MEMO_PROGRAM_ID = 'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr';

export const WELCOME_MEMO_MESSAGE = 'Welcome to Playshub';

export const MAX_TRIES_COUNT = 5;
