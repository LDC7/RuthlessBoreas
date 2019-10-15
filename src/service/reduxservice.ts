import { Action, createStore, Store } from 'redux';

import Character from '../models/character';

export type Dispatcher = (action: AppAction) => AppAction;
export type StateGetter = () => AppState;

class AppAction implements Action<any> {
  public type: string;
  public state: any;

  constructor(actionType: string) {
    this.type = actionType;
  }
}

export class AppState {
  characters?: Array<Character>;
  modalView?: any;
}

function reducer(state: AppState = {}, action: AppAction): AppState {
  if (action == null)
    return state;

  return Object.assign(state, action.state);
}

export default class ReduxService {
  private static initiated: boolean = false;
  private static store: Store<AppState, Action<any>>;
  
  public static initiateStore(): boolean {
    if (!ReduxService.initiated) {
      ReduxService.store = createStore(reducer);
      ReduxService.initiated = true;
      return true;
    }

    return false;
  }

  public static getDispatch(): Dispatcher {
    return ReduxService.store.dispatch;
  }

  public static getStateGetter(): StateGetter {
    return this.store.getState as StateGetter;
  }
}

export class CharactersAction extends AppAction {
  
  public constructor(chars: Array<Character>) {
    super('CharactersAction');
    this.state = {
      characters: chars
    };
  }
}

export class ModalAction extends AppAction {
  
  public constructor(modal: any) {
    super('ModalAction');
    this.state = {
      modalView: modal
    };
  }
}