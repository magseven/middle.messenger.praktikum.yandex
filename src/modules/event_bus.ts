export class EventBus {
  static __instance: EventBus;
  // eslint-disable-next-line
  __object: Map<string, Function[]> = new Map();

  constructor() {
      this.__object = new Map();
      EventBus.__instance = this;
  }
  // eslint-disable-next-line
  on( event: string, callback: Function): void { 
    if ( !this.__object.has( event)) {
      this.__object.set( event, [callback]);
    }else
      this.__object.set( event, [...this.__object.get(event)!, callback]);
    
    return;
  }
  
  // eslint-disable-next-line
  off( event: string, callback: Function): void {
    if ( !this.__object.has( event)) 
      return;
    
    this.__object.set( event, this.__object.get( event)!.filter((cb) => cb !== callback));
    console.log('off', this.__object.get(event)!.length, event);
  }
                                                           
  emit(event: string, ...args: unknown[]) {
    if ( !this.__object.has( event))
        return;

    // eslint-disable-next-line
    for ( let cb of this.__object.get( event)!)
        cb( ...args); 
  }
}

