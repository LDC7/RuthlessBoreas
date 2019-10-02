import * as React from 'react';

require('./mycell.css');

interface IProps {
  style?: React.CSSProperties;
  hint?: string | null;
  content: React.ReactNode;
  color?: string | null;
}

interface IState { }

export default class MyCell extends React.Component<IProps, IState> {

  public static renderEmptyCell(): React.ReactNode {
    return <td></td>;
  }

  public render(): React.ReactNode {
    let styles = this.props.style != null ? this.props.style : ({} as React.CSSProperties);
    if (this.props.color != null) 
      styles.color = this.props.color;

    const hint = this.props.hint != null ? this.props.hint : undefined;
    return <td className='td-cell' title={hint} style={styles}>
      {this.props.content}
    </td>;
  }
}