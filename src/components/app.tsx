import * as React from 'react';

import DataLoader from '../data/dataLoader';

require('./app.css');

interface IProps {

}

interface IState {

}

export default class App extends React.Component<IProps, IState> {

  public render(): React.ReactNode {
    const chars = DataLoader.GetCharacters();
    const names = chars.length;

    return <div id='app'>
      {names}
    </div>
  }
}
