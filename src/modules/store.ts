import {EventBus} from './event_bus'
import {defChat} from './types'

export enum StoreEvents {
  Updated = 'updated',
}

export type storeMessage = {
  user_id: number, 
  chat_id: number,
  content: string,
  time: string,
  id: string,
}

export type storeState = {
  user: Record<string, string> | null;
  chats: defChat[];
  selectedItem: number|null;
  token: string;
  messages: storeMessage[];
}

export const initialStoreState = {user: null, chats: [], selectedItem: null, token: '', messages: []};

class Store extends EventBus {
  private _state = initialStoreState;
  
  public getState() : storeState {
    return this._state;
  }
  
  public set(path: string, value: unknown) {
    console.log( 'store set:', path, value);

    const oldState: storeState = this.getState(); 
    this._state = { ...this._state, [path]: value}
    this.emit(StoreEvents.Updated, oldState, this.getState());
  };
}

export default new Store(); 
