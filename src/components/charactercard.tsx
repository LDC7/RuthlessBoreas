import * as React from 'react';

import LoadingSpiner from '../components/loadingspiner'
import CharacterCardData from '../models/charactercarddata';

require('./charactercard.css');

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

  private renderCard(): React.ReactNode {
    const char = this.state.data as CharacterCardData;
    return <div className='character-card'>
      <img className='character-card-image' src={char.PortraitUrl}/>
      {char.AverageDps}
      {char.AverageHps}
    </div>;
  }

  public render(): React.ReactNode {
    if (this.state.data == null)
      return this.renderPlaceholder();

    return this.renderCard();
  }
}
