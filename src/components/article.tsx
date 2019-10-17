import * as React from 'react';

import Character from '../models/character';
import Dungeon from '../models/dungeon';
import Utils from '../service/utils';

import MyCell from './mycell';

require('./article.css');
const rioLogo = require('../images/favicon.png');
const logLogo = require('../images/wlogsicon.png');
const armLogo = require('../images/wowicon.png');

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
    return MyCell.renderEmptyCell();
  }

  private renderImage(): React.ReactNode | null {
    const styles = { 'display': 'block', 'text-align': 'left' } as React.CSSProperties;
    const image = <img className='article-image' src={this.props.character.Portrait}/>;

    return <MyCell style={styles} content={image} />;
  }

  private renderName(text: string, textColor: string, mainName?: string | null): React.ReactNode {
    const styles = { 'color': textColor, 'font-style': mainName ? 'italic' : 'bold' } as React.CSSProperties;

    return <MyCell content={text} hint={mainName} style={styles} />;
  }

  private renderText(text: string, textColor?: string | null): React.ReactNode {
    return <MyCell content={text} color={textColor} />;
  }

  private renderLinks(): React.ReactNode {
    const styles = {
      'display': 'flex',
      'justify-content': 'space-evenly' } as React.CSSProperties;
    const links = <span style={styles}>
      <a target="_blank" href={this.props.character.RioProfile}><img className='article-link-img' src={rioLogo} /></a>
      <a target="_blank" href={this.props.character.WlogsProfile}><img className='article-link-img' src={logLogo} /></a>
      <a target="_blank" href={this.props.character.ArmoryProfile}><img className='article-link-img' src={armLogo} /></a>
    </span>;

    return <MyCell content={links} />;
  }

  private renderDungeon(dungeon: Dungeon | null): React.ReactNode {
    return dungeon != null
      ? <MyCell hint={dungeon.getNameWithTime()} content={dungeon.getKeyString()} color={Utils.getColorMaxKey(dungeon.KeyLevel)} />
      : this.renderEmptyCell();
  }

  public render(): React.ReactNode {
    const char = this.props.character;
    const color = {
      'background-color': this.props.even ? '#353535' : '#2b2b2b'
    } as React.CSSProperties;
    
    return <tr style={color}>
      {this.renderImage()}
      {this.renderName(char.Name, Utils.getColorClass(char.Class), char.MainName)}
      {this.renderText(char.ItemLevel.toString())}
      {this.renderText(char.RaidProgress, Utils.getColorRaidProgress(char.RaidProgress))}
      {char.ScoreTank != null ? this.renderText(char.ScoreTank.toString(), Utils.getColorKeyProgress(char.ScoreTank)) : this.renderEmptyCell()}
      {char.ScoreHealer != null ? this.renderText(char.ScoreHealer.toString(), Utils.getColorKeyProgress(char.ScoreHealer)) : this.renderEmptyCell()}
      {this.renderText(char.ScoreDps.toString(), Utils.getColorKeyProgress(char.ScoreDps))}
      {this.renderText(char.ScoreAll.toString(), Utils.getColorKeyProgress(char.ScoreAll))}
      {this.renderDungeon(char.MaxWeekKey)}
      {this.renderDungeon(char.MaxSeasonKey)}
      {this.renderLinks()}
    </tr>;
  }
}
