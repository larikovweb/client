import { Fn } from '@bunt/type';
import { RefObject, useEffect } from 'react';

type Listener = Fn;
type StackRef = { listener: Fn; ref: RefObject<HTMLElement> };

const locks: boolean[] = [];
const stack: StackRef[] = [];
const refs = new WeakSet();
document.body.addEventListener(
  'click',
  (event) => {
    if (locks.length) {
      return;
    }

    const last = stack[stack.length - 1];
    if (last) {
      const { ref, listener } = last;
      const el = ref.current;

      // Do nothing if clicking ref's element or descendent elements
      if (el?.contains(event.target as Node)) {
        return;
      }

      listener();
      event.stopPropagation();
    }
  },
  { capture: true },
);

function lock(): void {
  locks.push(true);
}

function unlock(): void {
  setTimeout(() => locks.pop(), 100);
}

export function useClickOutsideLock(): [Fn<[], Fn>, Fn] {
  return [
    () => {
      lock();

      return unlock;
    },
    unlock,
  ];
}

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  listener: Listener,
  active = true,
): void {
  useEffect(() => {
    const { current } = ref;
    if (current && active && !refs.has(current)) {
      refs.add(current);
      const item = { ref, listener };
      stack.push(item);

      return () => {
        const index = stack.findIndex((n) => n.ref.current === ref.current);
        if (index > -1) {
          refs.delete(current);
          stack.splice(index, 1);
        }
      };
    }
  }, [active]);
}

//usage

// const ref = useRef(null)

// const handleClickOutside = () => {
//   // Your custom logic here
//   console.log('clicked outside')
// }

// const handleClickInside = () => {
//   // Your custom logic here
//   console.log('clicked inside')
// }

// useOnClickOutside(ref, handleClickOutside)

// return (
//   <button
//     ref={ref}
//     onClick={handleClickInside}
//     style={{ width: 200, height: 200, background: 'cyan' }}
//   />
// )
