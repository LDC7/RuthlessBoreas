import * as React from 'react';
import ReactModal from 'react-modal';

import DataLoader from '../data/dataloader';
import StoreService from '../service/storeservice';

import Article from './article';
import LoadingSpiner from './loadingspiner';
import TableHeader from './tableheader';

require('./app.css');

interface IProps { }
 
interface IState {
  loaded: boolean;
  showModal: boolean;
}

export default class App extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      loaded: false,
      showModal: false
    };
    StoreService.subscribeComponent(this);
    DataLoader.loadCharacters().then(() => {
      this.setState({
        loaded: true
      });
    });
  }

  private handleOpenModal () {
    this.setState({ showModal: true });
  }

  private handleCloseModal () {
    this.setState({ showModal: false });
  }

  private renderAppHeader(): React.ReactNode {
    return <div id={'app-header'}>
      <h3>Безжалостный Борей</h3>
    </div>;
  }

  private renderFooter(): React.ReactNode {
    return <div id='footer-message'>
      <span>Если кого-то не хватает - напишите Менелосу</span>
      <span>Предложения по улучшению - тоже к Менелосу</span>
    </div>;
  }

  public render(): React.ReactNode {    
    if (!this.state.loaded)
      return <LoadingSpiner />;
    
    const dataIds = StoreService.getState().sortedCharacterIds as Array<number>;
    let evenFlag = false;
    return <div id='app'>
      <ReactModal
        isOpen={this.state.showModal}
        contentLabel="Minimal Modal Example"
      >
          <button onClick={this.handleCloseModal.bind(this)}>Close Modal</button>
      </ReactModal>
      <button onClick={this.handleOpenModal.bind(this)}>Trigger Modal</button>
      
      {this.renderAppHeader()}
      <table id='app-table'>
        <TableHeader/>
        {dataIds.map((id) => {
          evenFlag = !evenFlag;
          return <Article key={id} characterId={id} even={evenFlag} />
        })}
      </table>
      {this.renderFooter()}
    </div>;
  }
}
