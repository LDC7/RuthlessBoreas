import * as React from 'react';

import Character from '../models/character';
import CharacterSortingService from '../service/characterSortingService';
import StoreService from '../service/storeservice';

require('./tableheader.css');
const role_tank = require('../images/role_tank.webp');
const role_healer = require('../images/role_healer.webp');
const role_dps = require('../images/role_dps.webp');
const role_all = require('../images/flag.webp');

interface IProps { }

interface IState { }

export default class TableHeader extends React.Component<IProps, IState> {
  private sortColumnNumber: number | null = null;
  private ascSorting: boolean = true;
  
  private renderTableHeaderColumn(index: number, child: React.ReactNode, onClick?: () => void): React.ReactNode {
    return <th className={index == this.sortColumnNumber ? 'table-header-sort-column-selected'
      : 'table-header-sort-column'} onClick={onClick}>{child}</th>;
  }
  
  private onTableHeaderClick(column: number, sortFunc: ((f: Character, s: Character, asc: boolean) => number)) {
    if (column == this.sortColumnNumber)
      this.ascSorting = !this.ascSorting;
    else
      this.sortColumnNumber = column;
        
    let chars = StoreService.getState().characters as Array<Character>;
    chars = chars.sort((a, b) => sortFunc(a, b, this.ascSorting));
    StoreService.setState({sortedCharacterIds: chars.map(char => char.Id)});
  }

  public render(): React.ReactNode {  
    return <tr id='table-header'>
      <th></th>
      {this.renderTableHeaderColumn(1, 'Name', () => this.onTableHeaderClick(1, CharacterSortingService.comparingName))}
      {this.renderTableHeaderColumn(2, 'ILvL', () => this.onTableHeaderClick(2, CharacterSortingService.comparingILvl))}
      {this.renderTableHeaderColumn(3, 'Raid', () => this.onTableHeaderClick(3, CharacterSortingService.comparingRaidProgress))}
      {this.renderTableHeaderColumn(4, <img title='Tank Rio' src={role_tank} />, () => this.onTableHeaderClick(4, CharacterSortingService.comparingKeyProgressTank))}
      {this.renderTableHeaderColumn(5, <img title='Heal Rio' src={role_healer} />, () => this.onTableHeaderClick(5, CharacterSortingService.comparingKeyProgressHeal))}
      {this.renderTableHeaderColumn(6, <img title='Dps Rio' src={role_dps} />, () => this.onTableHeaderClick(6, CharacterSortingService.comparingKeyProgressDps))}
      {this.renderTableHeaderColumn(7, <img title='Rio' src={role_all} />, () => this.onTableHeaderClick(7, CharacterSortingService.comparingKeyProgressAll))}
      {this.renderTableHeaderColumn(8, 'Max Week Key', () => this.onTableHeaderClick(8, CharacterSortingService.comparingMaxWeekKey))}
      {this.renderTableHeaderColumn(9, 'Max Season', () => this.onTableHeaderClick(9, CharacterSortingService.comparingMaxSeasonKey))}
      <th></th>
    </tr>;
  }
}
