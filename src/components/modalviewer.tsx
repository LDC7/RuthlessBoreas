import * as React from 'react';
import ReactModal from 'react-modal';

import StoreService, { SubscribeType } from '../service/storeservice';

require('./modalviewer.css');

interface IProps { }
 
interface IState { }

export default class ModalViewer extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    StoreService.subscribeComponent(SubscribeType.modalView, this);
  }

  private closeModal() {
    StoreService.setModal(null);
  }

  private renderCloseButton(): React.ReactNode {
    return <button className="modal-close-button" onClick={this.closeModal}>Close</button> 
  }

  private getContent(): React.ReactNode {
    const modal = StoreService.getState().modalView;
    if (modal == null)
      return null;

    return <div>
      {modal}
      {this.renderCloseButton()}
    </div>;
  }

  public render(): React.ReactNode {
    const content = this.getContent();

    return <ReactModal
      isOpen={content != null}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={this.closeModal}
      contentLabel="Minimal Modal Example"
      className="modal"
      overlayClassName="overlay"
    >
      {content}
    </ReactModal>;
  }
}
