import * as React from 'react';

import DataLoader from '../data/dataloader';
import StoreService, { SubscribeType } from '../service/storeservice';

import Article from './article';
import LoadingSpiner from './loadingspiner';
import TableHeader from './tableheader';
import ModalViewer from './modalviewer';

require('./app.css');

interface IProps { }
 
interface IState {
  loaded: boolean;
}

export default class App extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      loaded: false
    };
    StoreService.subscribeComponent(SubscribeType.sortedCharacterIds, this);
    DataLoader.loadCharacters().then(() => {
      this.setState({loaded: true});
    });
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
      <ModalViewer />
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
