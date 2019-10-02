import * as React from 'react';

require('./loadingspiner.css');

const spiner = require('../images/loader.gif');

interface IProps { }

interface IState { }

export default class LoadingSpiner extends React.Component<IProps, IState> {

  public render(): React.ReactNode {
    return <img className='loading-spiner' src={spiner} />
  }
}
