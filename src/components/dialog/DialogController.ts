import { ReactNode, ReactPortal, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Dispatcher } from '../events/Dispatcher';
import { DialogType } from './context';

export class DialogController {
  #active = false;

  readonly #dialog: DialogType;

  readonly #dispatcher = new Dispatcher<{ change: [boolean] }>();

  readonly #parent: DialogController | null;

  static readonly containers = new Map<DialogType, HTMLDivElement>();

  constructor(dialog: DialogType, parent: DialogController | null) {
    this.#dialog = dialog;
    this.#parent = parent;
  }

  public static createContainer(): HTMLDivElement {
    const div = document.createElement('div');
    document.body.append(div);

    return div;
  }

  public static getContainer(id: DialogType): HTMLDivElement {
    const div = this.containers.get(id) ?? this.createContainer();
    if (!this.containers.has(id)) {
      this.containers.set(id, div);
    }

    return div;
  }

  public get active(): boolean {
    return this.#active;
  }

  public useState(): boolean {
    const [active, set] = useState(this.active);
    useEffect(() => this.#dispatcher.listen('change', set));

    return active;
  }

  public portal = (element: ReactNode): ReactPortal =>
    createPortal(element, DialogController.getContainer(this.#dialog));

  public set = (value: boolean): void => {
    if (value === this.active) {
      return;
    }

    this.toggle();
  };

  public close = (): void => this.set(false);

  public toggle = (): void => this.#toggle();

  public finish = (): void => {
    if (this.active === true) {
      this.#toggle();
    }
  };

  #toggle = (): void => {
    this.#active = !this.#active;
    if (this.#parent) {
      this.#parent.setVisibility(!this.active);
    }

    if (this.active) {
      this.setVisibility(this.active);
    }

    this.#dispatcher.fire('change', this.#active);
  };

  public setVisibility = (visible: boolean): void => {
    const container = DialogController.getContainer(this.#dialog);
    container.style.opacity = visible ? '1' : '0';

    if (this.#parent) {
      this.#parent.setVisibility(!this.#active);
    }
  };
}
