import * as React from 'react';

import Character from '../models/character';
import Utils from '../utils/utils';

require('./article.css');
const rioLogo = require('../images/favicon.png');
const logLogo = require('../images/wlogsicon.png');

interface IProps {
  character: Character;
  even: boolean;
}

interface IState { }

export default class Article extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
  }

  private renderEmptyCell(): React.ReactNode {
    return <td></td>;
  }

  private renderImage(): React.ReactNode | null {
    return <td className='article-imgpart'>
      <img className='article-image' src={this.props.character.Portrait}/>
    </td>;
  }

  private renderText(text: string, textColor?: string | null): React.ReactNode {
    const color = textColor != null
      ? { 'color': textColor } as React.CSSProperties
      : undefined;

    return <td className='article-textpart' style={color}>
      {text}
    </td>;
  }

  private renderLinks(): React.ReactNode {
    return <td className='article-textpart'>
      <span>
        <a target="_blank" href={this.props.character.RioProfile}><img className='article-link-img' src={rioLogo} /></a>
        <a target="_blank" href={this.props.character.WlogsProfile}><img className='article-link-img' src={logLogo} /></a>
      </span>
    </td>
  }

  public render(): React.ReactNode {
    const char = this.props.character;
    const color = {
      'background-color': this.props.even ? '#353535' : '#2b2b2b'
    } as React.CSSProperties;
    
    return <tr style={color}>
      {this.renderImage()}
      {this.renderText(char.Name, Utils.getColorClass(char.Class))}
      {this.renderText(char.ItemLevel.toString())}
      {this.renderText(char.RaidProgress, Utils.getColorRaidProgress(char.RaidProgress))}
      {char.ScoreTank != null ? this.renderText(char.ScoreTank.toString(), Utils.getColorKeyProgress(char.ScoreTank)) : this.renderEmptyCell()}
      {char.ScoreHealer != null ? this.renderText(char.ScoreHealer.toString(), Utils.getColorKeyProgress(char.ScoreHealer)) : this.renderEmptyCell()}
      {this.renderText(char.ScoreDps.toString(), Utils.getColorKeyProgress(char.ScoreDps))}
      {this.renderText(char.ScoreAll.toString(), Utils.getColorKeyProgress(char.ScoreAll))}
      {this.renderLinks()}
    </tr>;
  }
}
