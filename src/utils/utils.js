import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (date) => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2);
  const month = d.toLocaleDateString('en-us', { month: 'long' });
  const year = d.getFullYear();

  return `${day}, ${month}, ${year}`;
};
