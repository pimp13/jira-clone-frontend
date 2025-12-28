import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// My global utils
export function generateInviteCode(lenght: number = 64) {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';

  let result = '';
  for (let i = 0; i < lenght; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
