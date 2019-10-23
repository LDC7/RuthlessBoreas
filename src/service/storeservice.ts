import * as React from 'react';

import Character from '../models/character';

class AppStore {
  sortedCharacterIds?: Array<number>;
  characters?: Array<Character>;
  modalView?: React.ReactNode;
}

export default class StoreService {
  private static callbacks: Array<() => any> = [];
  private static store: AppStore = new AppStore();

  public static subscribeComponent(component: React.Component) {
    StoreService.subscribe(component.forceUpdate.bind(component));
  }

  public static subscribe(callback: () => any) {
    StoreService.callbacks.push(callback);
  }

  public static getState(): AppStore {
    return StoreService.store;
  }
  
  public static setState(additionalState: AppStore) {
    StoreService.store = { ...StoreService.store, ...additionalState };
    StoreService.callbacks.map(callback => callback());
  }
}
