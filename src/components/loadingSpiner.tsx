import * as React from 'react';

const spiner = require('../images/loader.gif');

interface IProps {
  width?: number;
  height?: number;
}

interface IState { }

export default class LoadingSpiner extends React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
  }

  public render(): React.ReactNode {
    const style = {
      width: this.props.width != null ? `${this.props.width}px` : '200px',
      height: this.props.height != null ? `${this.props.height}px` : '200px'
    } as React.CSSProperties;

    return <img style={style} src={spiner} />
  }
}