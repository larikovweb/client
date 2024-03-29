import * as React from 'react';
import { CSSTransition, TransitionStatus } from 'react-transition-group';

const staticDuration = 350;

const defaultStyle = {
  transition: `all ${staticDuration}ms ease-in-out`,
};

export const fadeInStyles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

export const fadeInScaleStyles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
  entering: { opacity: 1, transform: 'scale(1)' },
  entered: { opacity: 1, transform: 'scale(1)' },
  exiting: { opacity: 0, transform: 'scale(0.25)' },
  exited: { opacity: 0, transform: 'scale(0.25)' },
};

export const fadeInUpStyles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
  entering: { opacity: 1, transform: 'translateY(0)' },
  entered: { opacity: 1, transform: 'translateY(0)' },
  exiting: { opacity: 0, transform: 'translateY(100%)' },
  exited: { opacity: 0, transform: 'translateY(100%)' },
};

export const fadeInLeftStyles: Partial<Record<TransitionStatus, React.CSSProperties>> = {
  entering: { opacity: 1, transform: 'translateX(0%) scale(1)' },
  entered: { opacity: 1, transform: 'translateX(0%) scale(1)' },
  exiting: { opacity: 0, transform: 'translateX(-30%) scale(0.9)' },
  exited: { opacity: 0, transform: 'translateX(-30%) scale(0.75)' },
};

interface Props {
  in: boolean;
  children: React.ReactNode | React.ReactNode[];
  duration?: number;
  fadeStyles?: Partial<Record<TransitionStatus, React.CSSProperties>>;
}

export const FadeTransition: React.FC<Props> = (props) => {
  const { in: active, children, duration = staticDuration, fadeStyles = fadeInStyles } = props;
  const nodeRef = React.useRef(null);

  const childElement = React.Children.only(children) as React.ReactElement;

  return (
    <CSSTransition nodeRef={nodeRef} in={active} timeout={duration} mountOnEnter unmountOnExit>
      {(state) => {
        return React.cloneElement(childElement, {
          style: {
            ...defaultStyle,
            ...fadeStyles[state],
            ...childElement.props.style,
          },
          ref: nodeRef,
        });
      }}
    </CSSTransition>
  );
};
