import { cloneElement, FC } from 'react';

import { useClickLink, UseClickLinkArgs } from './hook';

type Props = UseClickLinkArgs & {
  to: string;
  children: React.ReactElement;
};

export const NavigateClick: FC<Props> = ({ children, to, onNavigate, onNavigateAfter }) => {
  const onClick = useClickLink(to, { onNavigate, onNavigateAfter });

  return <>{cloneElement(children, { onClick })}</>;
};
