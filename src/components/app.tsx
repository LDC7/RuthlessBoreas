import * as React from 'react';

import Article from './article'
import LoadingSpiner from './loadingSpiner'

import DataLoader from '../data/dataLoader';
import Character from '../models/character';

require('./app.css');
const role_tank = require('../images/role_tank.webp');
const role_healer = require('../images/role_healer.webp');
const role_dps = require('../images/role_dps.webp');
const role_all = require('../images/flag.webp');

interface IProps { }

interface IState {
  data: Array<Character> | null;
  loaded: boolean;
}

export default class App extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = {
      data: null,
      loaded: false
    };
    DataLoader.GetCharacters().then((data) => {
      this.setState({
        data: data.sort((a, b) => Character.sortingKeyProgressAll(a, b) * -1),
        loaded: true
      });
    });
  }

  private renderHeader(): React.ReactNode {
    return <div id={'app-header'}>
      <h3>Безжалостный Борей</h3>
    </div>
  }

  private renderTableHeader(): React.ReactNode {
    return <tr id='table-header'>
      <th id='table-header-img-column'></th>
      <th>Name</th>
      <th>ILvL</th>
      <th>Raid</th>
      <th><img src={role_tank} /></th>
      <th><img src={role_healer} /></th>
      <th><img src={role_dps} /></th>
      <th><img src={role_all} /></th>
      <th></th>
    </tr>
  }

  public render(): React.ReactNode {    
    if (!this.state.loaded || this.state.data == null || this.state.data.length == 0)
      return <LoadingSpiner />;
    
    let evenFlag = false;
    return <div id='app'>
      {this.renderHeader()}
      <table id='app-table'>
        {this.renderTableHeader()}
        {this.state.data.map((char) => {
          evenFlag = !evenFlag;
          return <Article key={char.Id} character={char} even={evenFlag} />
        })}
      </table>
    </div>;
  }
}
