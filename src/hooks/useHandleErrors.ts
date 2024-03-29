import { useEffect } from 'react';
import { isDefined } from '@bunt/is';
import { handleApiError } from '../components/fn';
import { NotificationType } from './useNotifications';

export const useHandleErrors = (
  errors: Array<unknown>,
  notify: (message: string | null | undefined, type: NotificationType) => string | undefined,
  isAuth?: boolean,
) => {
  useEffect(() => {
    errors.forEach((error) => {
      if (error && (isDefined(isAuth) ? !isAuth : true)) {
        notify(handleApiError(error), 'error');
      }
    });
  }, [errors, notify, isAuth]);
};
