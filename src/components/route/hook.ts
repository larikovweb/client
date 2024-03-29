import { Rec } from '@bunt/type';
import { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { assert } from '../fn';

export function useRequiredParam<T extends Rec<string, string | null>>(
  config: T,
): Rec<keyof T, string> {
  const params = useParams();
  for (const [key, message] of Object.entries(config)) {
    assert(key in params, message || `Argument excepted ${key}`);
  }

  return params as Rec<keyof T, string>;
}

export type UseClickLinkArgs = {
  onNavigate?: () => void;
  onNavigateAfter?: () => void;
  replace?: boolean;
};

export function useClickLink(uri: string, args: UseClickLinkArgs): (e: React.MouseEvent) => void {
  const nav = useNavigate();

  return useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      args.onNavigate?.();
      nav(uri, { replace: args.replace });
      args.onNavigateAfter?.();
    },
    [uri],
  );
}
