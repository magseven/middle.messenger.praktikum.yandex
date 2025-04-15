// modules/event-bus.js
class EventBus {
    static __instance: EventBus;
    __object: Map<string, Function[]> = new Map();

    constructor() {
        if (EventBus.__instance) {
          return EventBus.__instance;
        }
    
        this.__object = new Map();
        EventBus.__instance = this;
    }

    on( event: string, callback: Function): void { 
      if ( !this.__object.has( event)) 
        this.__object.set( event, [callback]);
      else
        this.__object.set( event, [...this.__object.get(event)!, callback]);
      return;
    }

    off( event: string, callback: Function): void {
      if ( !this.__object.has( event)) 
        return;
      
      this.__object.set( event, this.__object.get( event)!.filter((cb) => cb != callback));
    }

    emit(event: string, eventData: {[key:string]:string}) {
        if ( !this.__object.has( event))
          return;

        for ( let cb of this.__object.get( event)!)
          cb( eventData); 
    }
}

  export default new EventBus(); 
 