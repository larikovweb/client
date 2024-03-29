import { isDefined, isFunction, isNull, isString, isUndefined } from '@bunt/is';
import { ApiError } from '../../interfaces/error';

type Thunk<T> = T | (() => T);

type AssertionMessage = Thunk<string | Error>;

export function assert(
  expr: unknown,
  message: AssertionMessage = 'Assertion failed',
): asserts expr {
  if (!expr) {
    message = isFunction(message) ? message() : message;
    const error = isString(message) ? new Error(message) : message;
    throw error;
  }
}

export function createQueryString(
  params: Record<string, string | number | undefined | boolean>,
): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (isDefined(value)) {
      searchParams.set(key, String(value));
    }
  });
  return searchParams.toString();
}

export const handleApiError = (error: unknown): string | null => {
  if (error === false || error === undefined) {
    return null;
  }

  if (error instanceof Error) {
    return error.message;
  }

  const apiError = error as ApiError;

  if (apiError.error) {
    return apiError.error;
  } else if (apiError.data?.message) {
    return apiError.data.message;
  } else {
    return 'An unexpected error occurred';
  }
};

export function transformDateFormat(originalDateString: string | null | undefined) {
  if (isNull(originalDateString) || isUndefined(originalDateString)) {
    return originalDateString;
  }
  const originalDate = new Date(originalDateString);
  const day = originalDate.getUTCDate().toString().padStart(2, '0');
  const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = originalDate.getUTCFullYear().toString().slice(-2);
  return `${day}.${month}.${year}`;
}

export function getRandomInt(end: number) {
  return Math.floor(Math.random() * end);
}

export function isSafari() {
  const userAgent = navigator.userAgent;
  const isChrome = userAgent.indexOf('Chrome') > -1;
  const isSafari = userAgent.indexOf('Safari') > -1;

  return isSafari && !isChrome;
}
