import * as React from 'react';

import LoadingSpiner from '../components/loadingspiner'
import CharacterCardData from '../models/charactercarddata';
import Utils from '../service/utils';

require('./charactercard.css');

const needIdeas = require('../images/needIdeasPlaceholder.png');

interface IProps {
  data: CharacterCardData;
}

interface IState {
  data: CharacterCardData | null;
}

export default class CharacterCard extends React.Component<IProps, IState> {

  public constructor(props: IProps) {
    super(props);
    this.state = {
      data: this.props.data.IsLoaded ? this.props.data : null
    };
    
    if (!this.props.data.IsLoaded)
      this.props.data.load().then(() => this.setState({data: this.props.data}));
  }

  public static createCard(data: CharacterCardData) {
    return <CharacterCard data={data} />;
  }
  
  private renderPlaceholder(): React.ReactNode {
    return <div className='character-card'>
      <LoadingSpiner />
    </div>;
  }

  private renderHeader(char: CharacterCardData): React.ReactNode {    
    const color = { 'color': Utils.getColorClass(char.Class) } as React.CSSProperties;
    return <div className='character-card-header' style={color}>{`${char.Name}-${char.ServerName}`}</div>;
  }

  private renderSide(char: CharacterCardData): React.ReactNode {
    const dpsColor = { 'color': Utils.getColorPercentage(char.DpsPercent) } as React.CSSProperties;
    const hpsColor = { 'color': Utils.getColorPercentage(char.HpsPercent) } as React.CSSProperties;

    return <div className='character-card-side'>
      <img className='character-card-image' src={char.PortraitUrl}/>
      <span className='character-card-side-data'>
        <span className='character-card-side-data-key'>{'Average Raid DPS:'}</span>
        <span className='character-card-side-data-value' style={dpsColor}>{char.AverageDps}</span>
      </span>
      <span className='character-card-side-data'>
        <span className='character-card-side-data-key'>{'Raid DPS Percent:'}</span>
        <span className='character-card-side-data-value' style={dpsColor}>{char.DpsPercent}</span>
      </span>
      <span className='character-card-side-data'>
        <span className='character-card-side-data-key'>{'Average Raid HPS:'}</span>
        <span className='character-card-side-data-value' style={hpsColor}>{char.AverageHps}</span>
      </span>
      <span className='character-card-side-data'>
        <span className='character-card-side-data-key'>{'Raid HPS Percent:'}</span>
        <span className='character-card-side-data-value' style={hpsColor}>{char.HpsPercent}</span>
      </span>
      <div className='character-card-side-data-placeholder' />
    </div>;
  }

  private renderContent(char: CharacterCardData): React.ReactNode {
    return <div className='character-card-content'>
      <img src={needIdeas} />
    </div>;
  }

  private renderMain(char: CharacterCardData): React.ReactNode {
    return <div className='character-card-main'>
      {this.renderSide(char)}
      {this.renderContent(char)}
    </div>;
  }

  private renderCard(): React.ReactNode {
    const char = this.state.data as CharacterCardData;
    return <div className='character-card'>
      {this.renderHeader(char)}
      {this.renderMain(char)}
    </div>;
  }

  public render(): React.ReactNode {
    if (this.state.data == null)
      return this.renderPlaceholder();

    return this.renderCard();
  }
}
