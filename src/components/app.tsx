import * as React from 'react';

import Article from './article';
import LoadingSpiner from './loadingSpiner';

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
  private sortColumnNumber: number | null = null;
  private ascSorting: boolean = true;

  public constructor(props: IProps) {
    super(props);
    this.state = {
      data: null,
      loaded: false
    };
    DataLoader.getCharacters().then((data) => {
      this.setState({
        data: data,
        loaded: true
      });
    });
  }

  private renderHeader(): React.ReactNode {
    return <div id={'app-header'}>
      <h3>Безжалостный Борей</h3>
    </div>;
  }

  private renderTableHeaderColumn(index: number, child: React.ReactNode, onClick?: () => void): React.ReactNode {
    return <th className={index == this.sortColumnNumber ? 'table-header-sort-column-selected'
      : 'table-header-sort-column'} onClick={onClick}><div className='table-header-sort-column-content'>{child}</div></th>;
  }

  private renderTableHeader(): React.ReactNode {
    return <tr id='table-header'>
      <th></th>
      {this.renderTableHeaderColumn(1, 'Name', () => this.onTableHeaderClick(1, Character.comparingName))}
      {this.renderTableHeaderColumn(2, 'ILvL', () => this.onTableHeaderClick(2, Character.comparingILvl))}
      {this.renderTableHeaderColumn(3, 'Raid', () => this.onTableHeaderClick(3, Character.comparingRaidProgress))}
      {this.renderTableHeaderColumn(4, <img title='Tank Rio' src={role_tank} />, () => this.onTableHeaderClick(4, Character.comparingKeyProgressTank))}
      {this.renderTableHeaderColumn(5, <img title='Heal Rio' src={role_healer} />, () => this.onTableHeaderClick(5, Character.comparingKeyProgressHeal))}
      {this.renderTableHeaderColumn(6, <img title='Dps Rio' src={role_dps} />, () => this.onTableHeaderClick(6, Character.comparingKeyProgressDps))}
      {this.renderTableHeaderColumn(7, <img title='Rio' src={role_all} />, () => this.onTableHeaderClick(7, Character.comparingKeyProgressAll))}
      <th>Max Week Key</th>
      <th></th>
    </tr>;
  }

  private onTableHeaderClick(column: number, sortFunc: ((f: Character, s: Character) => number)) {
    if (this.state.data != null) {
      if (column == this.sortColumnNumber)
        this.ascSorting = !this.ascSorting;
      else
        this.sortColumnNumber = column;
      
      this.setState({
        data: this.state.data.sort((a, b) => sortFunc(a, b) * (this.ascSorting ? 1 : -1))
      });
    }
  }

  private renderFooter(): React.ReactNode {
    return <div id='footer-message'>
      <span>Если кого-то не хватает - напишите Менелосу</span>
      <span>Предложения по улучшению - тоже к Менелосу</span>
    </div>;
  }

  public render(): React.ReactNode {    
    if (!this.state.loaded || this.state.data == null || this.state.data.length == 0)
      return <LoadingSpiner />;
    
    const data: Array<Character> = this.state.data;
    let evenFlag = false;
    return <div id='app'>
      {this.renderHeader()}
      <table id='app-table'>
        {this.renderTableHeader()}
        {data.map((char) => {
          char.setMainName(data);
          evenFlag = !evenFlag;
          return <Article key={char.Id} character={char} even={evenFlag} />
        })}
      </table>
      {this.renderFooter()}
    </div>;
  }
}
