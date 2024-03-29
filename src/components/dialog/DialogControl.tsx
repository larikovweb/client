import { Rec } from '@bunt/type';
import React, { cloneElement, ReactElement } from 'react';

import { DialogContext, useDialogControl } from './context';
import { DialogPropsAsync } from './DialogAsync';
import { DialogController } from './DialogController';
import { DialogLayout } from './DialogLayout';
import { DialogRenderStrategy } from './DialogRenderStrategy';

type Props<P> = {
  children?: ReactElement;
  control?: DialogController;
  overlay?: boolean;
  closeVerify?: boolean;
  renderChildrenOnly?: boolean;
} & { [K in keyof P]: P[K] };

export type DialogPropsSimple = {
  dialog: React.ReactElement;
};

export function DialogControl<T extends Rec>(
  props: Props<DialogPropsSimple | DialogPropsAsync<T>>,
): ReactElement | null {
  const { Provider } = DialogContext;
  const control = props.control ?? useDialogControl(props.dialog);
  const { toggle: onClick } = control;

  if (props.renderChildrenOnly) {
    return props.children || null;
  }

  const childrenWithOnClick = props.children ? cloneElement(props.children, { onClick }) : null;

  return (
    <Provider value={control}>
      {childrenWithOnClick}
      <DialogLayout overlay={props.overlay}>
        <DialogRenderStrategy {...props} />
      </DialogLayout>
    </Provider>
  );
}
