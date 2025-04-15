//modules/event-bus.js
export class EventBus {
    static __instance: EventBus;
    __object: Map<string, Function[]> = new Map();

    constructor() {
      // const eventBus = new EventBus();
      // this.eventBus = () => eventBus;      
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

  // export default new EventBus(); 


// class EventBus {
//   constructor() {
//       this.listeners = {};
//   }

//   on(event, callback) {
//       if (!this.listeners[event]) {
//           this.listeners[event] = [];
//       }

//       this.listeners[event].push(callback);
// }

//   off(event, callback) {
//       if (!this.listeners[event]) {
//     throw new Error(`Нет события: ${event}`);
//   }

//   this.listeners[event] = this.listeners[event].filter(
//     listener => listener !== callback
//   );
// }

//   emit(event, ...args) {
//       if (!this.listeners[event]) {
//               throw new Error(`Нет события: ${event}`);
//       }

//       this.listeners[event].forEach(listener => {
//           listener(...args);
//       });
//   }
// }