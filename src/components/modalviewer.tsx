import * as React from 'react';
import ReactModal from 'react-modal';

import StoreService from '../service/storeservice';

require('./modalviewer.css');

interface IProps { }
 
interface IState { }

export default class ModalViewer extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    StoreService.subscribeComponent(this);
  }

  private closeModal() {
    StoreService.setState({modalView: null});
  }

  private renderCloseButton(): React.ReactNode {
    return <button onClick={this.closeModal}>Close</button> 

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
      className="Modal"
      overlayClassName="Overlay"
    >
      {content}
    </ReactModal>;
  }
}
