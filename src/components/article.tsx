import * as React from 'react';

import LoadingSpiner from './loadingSpiner';

import Character from '../models/character';
import Utils from '../utils/utils'

require('./article.css');
const rioLogo = require('../images/favicon.png');
const logLogo = require('../images/wlogsicon.png');

interface IProps {
  character: Promise<Character>;
  even: boolean;
  loadCallback: () => void;
}

interface IState {
  character: Character | null;
}

export default class Article extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      character: null
    };
    this.props.character.then((char) => {
      this.setState({
        character: char
      });
      this.props.loadCallback();
    });
  }

  private renderEmptyCell(): React.ReactNode {
    return <td></td>;
  }

  private renderImage(char: Character): React.ReactNode | null {
    return <td className='article-imgpart'>
      <img className='article-image' src={char.Portrait}/>
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

  private renderLinks(char: Character): React.ReactNode {
    return <td className='article-textpart'>
      <span>
        <a target="_blank" href={char.RioProfile}><img className='article-link-img' src={rioLogo} /></a>
        <a><img className='article-link-img' src={logLogo} /></a>
      </span>
    </td>
  }

  private renderLoadingRow(color: React.CSSProperties): React.ReactNode {
    return <tr className='article' style={color}>
        <LoadingSpiner width={50} height={50} />
        {this.renderEmptyCell()}
        {this.renderEmptyCell()}
        {this.renderEmptyCell()}
        {this.renderEmptyCell()}
        {this.renderEmptyCell()}
        {this.renderEmptyCell()}
        {this.renderEmptyCell()}
        {this.renderEmptyCell()}
      </tr>;
  }

  public render(): React.ReactNode {
    const char = this.state.character;
    const color = {
      'background-color': this.props.even ? '#353535' : '#2b2b2b'
    } as React.CSSProperties;

    if (char == null)
      return this.renderLoadingRow(color);

    return <tr className='article' style={color}>
      {this.renderImage(char)}
      {this.renderText(char.Name, Utils.getColorClass(char.Class))}
      {this.renderText(char.ItemLevel.toString())}
      {this.renderText(char.RaidProgress, Utils.getColorRaidProgress(char.RaidProgress))}
      {char.ScoreTank != null ? this.renderText(char.ScoreTank.toString(), Utils.getColorKeyProgress(char.ScoreTank)) : this.renderEmptyCell()}
      {char.ScoreHealer != null ? this.renderText(char.ScoreHealer.toString(), Utils.getColorKeyProgress(char.ScoreHealer)) : this.renderEmptyCell()}
      {this.renderText(char.ScoreDps.toString(), Utils.getColorKeyProgress(char.ScoreDps))}
      {this.renderText(char.ScoreAll.toString(), Utils.getColorKeyProgress(char.ScoreAll))}
      {this.renderLinks(char)}
    </tr>;
  }
}