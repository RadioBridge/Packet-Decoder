import { Buffer } from 'buffer';

export const base64decode = (str: string): string =>
  Buffer.from(str, 'base64').toString('binary');
export const base64encode = (str: string): string =>
  Buffer.from(str, 'binary').toString('base64');
