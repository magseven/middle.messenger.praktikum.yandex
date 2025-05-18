import {EventBus} from './event_bus'

export enum StoreEvents {
  Updated = 'updated',
}

export type storeState = {
  user: Record<string, string> | null;
}

class Store extends EventBus {
  private _state = { user: null};
  
  public getState() : storeState {
    return this._state;
  }
  
  public set(path: string, value: unknown) {
    console.log( 'store set:', path, value);
    this._state = { ...this._state, [path]: value}
    this.emit(StoreEvents.Updated);
  };
}

export default new Store(); 
