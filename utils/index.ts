import crypto from 'crypto';

export const jsonFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export const handlePasswordHash = (password: string, passwordSalt: string) =>
  crypto.pbkdf2Sync(password, passwordSalt, 1000, 64, 'sha512').toString('hex');
