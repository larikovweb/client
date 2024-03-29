import React, { createContext, isValidElement, useContext, useMemo } from 'react';

import { DialogController } from './DialogController';

export type DialogType = React.FC<any> | React.ReactElement | null;

export const DialogContext = createContext<DialogController>(null as any);

export function useDialogControl(dialog: DialogType): DialogController {
  const parent = useContext(DialogContext);
  const id = isValidElement(dialog) ? dialog.type : dialog;

  return useMemo(() => new DialogController(dialog, parent), [id]);
}

export function useDialog(): DialogController {
  return useContext(DialogContext);
}
