import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Notification = {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
};

const initialState: Notification[] = [];

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      return state.filter((notification) => notification.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationsSlice.actions;
export default notificationsSlice.reducer;
