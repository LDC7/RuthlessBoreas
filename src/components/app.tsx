import * as React from 'react';

import Article from './article'
import LoadingSpiner from './loadingSpiner'

import DataLoader from '../data/dataLoader';
import Character from '../models/character';

require('./app.css');

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
        data: data.sort((a, b) => Character.sortingRaidProgress(a, b) * -1),
        loaded: true
      });
    });
  }

  private renderTableHeader(): React.ReactNode {
    return <tr id='table-header'>
      <th></th>
      <th>Name</th>
      <th>ILvL</th>
      <th>Raid</th>
      <th>/*tank</th>
      <th>/*heal</th>
      <th>/*dps</th>
      <th>/*all</th>
      <th></th>
    </tr>
  }

  public render(): React.ReactNode {    
    if (!this.state.loaded || this.state.data == null || this.state.data.length == 0)
      return <LoadingSpiner />;
    
    let evenFlag = false;
    return <table id='app'>
      {this.renderTableHeader()}
      {this.state.data.map((char) => {
        evenFlag = !evenFlag;
        return <Article key={char.Id} character={char} even={evenFlag} />
      })}
    </table>;
  }
}
