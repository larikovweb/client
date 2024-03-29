// hooks/useNotifications.ts
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { isNull } from '@bunt/is';
import { addNotification, removeNotification } from '../redux/slice/notificationsSlice';

export type NotificationType = 'success' | 'error' | 'info';

const useNotifications = () => {
  const dispatch = useDispatch();

  const notify = (message: string | null = 'Something went wrong', type: NotificationType) => {
    if (isNull(message)) return;
    const id = uuidv4();
    dispatch(addNotification({ id, message, type }));

    return id;
  };

  const dismiss = (id: string) => {
    dispatch(removeNotification(id));
  };

  return { notify, dismiss };
};

export default useNotifications;
