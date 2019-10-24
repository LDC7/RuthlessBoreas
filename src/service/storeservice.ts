import * as React from 'react';

import Character from '../models/character';

class AppStore {
  sortedCharacterIds?: Array<number>;
  characters?: Array<Character>;
  modalView?: React.ReactNode;
}

export enum SubscribeType {
  sortedCharacterIds,
  characters,
  modalView
}

type Callback = () => any;

type Dictionary<K extends number | string | symbol, V> = {[key in K]: V};

class Subscribes {
  private callbacks: Dictionary<SubscribeType, Array<Callback>>;
  
  public constructor() {
    const enumLength = Object.keys(SubscribeType).length / 2;
    for (let i = 0; i < enumLength; i++)
      this.callbacks[SubscribeType[i]] = [];
  }

  public subscribe(type: SubscribeType, callback: Callback) {
    this.callbacks[type].push(callback);
  }
  
  public invoke(type: SubscribeType) {
    const callbacks = this.callbacks[type];
    callbacks.map(callback => callback());
  }
}

export default class StoreService {
  private static store: AppStore = new AppStore();
  private static subscribes: Subscribes = new Subscribes();

  public static subscribeComponent(type: SubscribeType, component: React.Component) {
    StoreService.subscribe(type, component.forceUpdate.bind(component));
  }

  public static subscribe(type: SubscribeType, callback: Callback) {
    StoreService.subscribes.subscribe(type, callback);
  }

  public static getState(): AppStore {
    return StoreService.store;
  }

  public static setSortedIds(ids: Array<number>) {
    StoreService.store.sortedCharacterIds = ids;
    StoreService.subscribes.invoke(SubscribeType.sortedCharacterIds);
  }

  public static setCharacters(chars: Array<Character>) {
    StoreService.store.characters = chars;
    StoreService.subscribes.invoke(SubscribeType.characters);
  }

  public static setModal(modal: React.ReactNode) {
    StoreService.store.modalView = modal;
    StoreService.subscribes.invoke(SubscribeType.modalView);
  }
}
