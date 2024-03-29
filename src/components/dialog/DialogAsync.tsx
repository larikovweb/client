import { isFunction } from '@bunt/is';
import { Fn, Promisify } from '@bunt/type';
import { Rec } from '@bunt/type';
import { FC, ReactElement, useEffect, useState } from 'react';

export type DialogPropsAsync<P extends Rec> = {
  dialog: FC<P>;
  props: P | Fn<[], Promisify<P>>;
};

export function DialogAsync<P extends Rec>({
  dialog: Dialog,
  props,
}: DialogPropsAsync<P>): ReactElement | null {
  const [state, setState] = useState<P | null>(null);
  const [loading, setLoading] = useState<ReactElement | null>(null);

  useEffect(() => {
    if (!state) {
      const tm = setTimeout(() => setLoading(<div>Loading...</div>), 100);

      return () => clearTimeout(tm);
    }
  }, [state]);

  useEffect(() => {
    if (!state) {
      const result = isFunction(props) ? props() : props;
      Promise.resolve<P>(result).then((res) => {
        if (loading) {
          setTimeout(() => setState(res), 500);
        } else {
          setState(res);
        }
      });
    }
  }, [state]);

  return state ? <Dialog {...state} /> : loading;
}
