// ----------------------------------------------------------------------

import { IPlayer } from "src/types/player";

export function emptyRows(page: number, rowsPerPage: number, arrayLength: number) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}
function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
  const aValue = a[orderBy] ?? 0;
  const bValue = b[orderBy] ?? 0;

  if (typeof aValue === 'number' && typeof bValue === 'number') {
    return bValue - aValue;
  }

  if (typeof aValue === 'string' && typeof bValue === 'string') {
    return bValue.localeCompare(aValue);
  }

  return 0;
}

export function getComparator<Key extends keyof IPlayer>(
  order: 'asc' | 'desc',
  orderBy: Key
): (a: IPlayer, b: IPlayer) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
