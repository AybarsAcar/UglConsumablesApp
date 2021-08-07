//
// Class that stores the state related to modal
// So the modals can be accessed from anywhere in the application
// handles opening and closing of the modal pop ups
//

import { makeAutoObservable } from 'mobx';

interface Modal {
  open: boolean;
  body: JSX.Element | null;
}

export class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: JSX.Element) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  closeModal = () => {
    this.modal.open = false;
    this.modal.body = null;
  };
}
