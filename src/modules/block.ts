import {v4 as makeUUID} from 'uuid';

import Handlebars from 'handlebars';
import { EventBus } from "./event_bus";
import { defEventList } from "./types";

/** JSDoc
 * @param {string} tagName
 * @param {Object} props
 *
 * @returns {void}
 */

export type BlockProps = {
  [key: string]: unknown;  
  attr?: Record<string, string>;
  events?: Record<string, (e: Event) => void>;
  data?: Record<string, string|number|unknown>[];
  menu?: string[]; 
}
  

export type Children = {
  [key: string]: Block;
};

type Events = {
   [eventName: string]: (e: Event) => void;
 };

export class Block {
  static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render",
      FLOW_CDUM: "flow:component-did-unmount",      
  };  
  
  id: string = '';
  _element!: HTMLElement;
  tagName: string;
  props: BlockProps = {};
  children: Children = {};
  eventBus: EventBus;
  events: Events = {};
  
    constructor(tagName = "div", propsAndChildren : BlockProps = {}) {

      this.id = makeUUID();

      const { children, props, events} = this._getChildren(propsAndChildren);
      this.tagName = tagName;
      this.props = this._makePropsProxy<BlockProps>(props);
      this.children = this._makePropsProxy<Children>(children);
      this.events = events;
      this.eventBus = new EventBus();
  
      this._registerEvents( this.eventBus);
      this.eventBus.emit(Block.EVENTS.INIT);
    }
  
    _getChildren( propsAndChildren: BlockProps) {
      const children: Children = {};
      const props: BlockProps = {};
      const events: Events = {};

      Object.entries(propsAndChildren).forEach(([key, value]) => {
        if (value instanceof Block) {
          children[key] = value;
          
       }else if (key === 'events' && typeof value === 'object') {
        Object.entries( value as object).forEach(([ekey, evalue]) => {
            if (Object.hasOwn(defEventList, ekey) && typeof evalue === 'function') {
            events[ekey] = evalue as (event: Event) => void;
          }
        })

      }else{
          props[key] = value;
       }
      });

      return { children, props, events };
    }

    addAttribute() {
      const { attrs = {} } = this.props as { attrs?: Record<string, string> };
      Object.entries(attrs).forEach(([key, value]) => {
        this._element.setAttribute(key, value);
      });
    }

    compile( template: string, props: BlockProps) : DocumentFragment {
      const propsAndStubs = { ...props };
      Object.entries(this.children).forEach(([key, child]) => {
           propsAndStubs[key] = `<div data-id="${child.id}"></div>`
      });

      const fragment: HTMLTemplateElement = this._createDocumentElement('template') as HTMLTemplateElement;
      fragment.innerHTML = Handlebars.compile(template)(propsAndStubs);
      Object.values(this.children).forEach(child => {
          const stub = fragment.content.querySelector(`[data-id="${child.id}"]`);
          if ( stub) {
            stub!.replaceWith(child.getContent());
          }
      });
      //console.log(fragment.innerHTML);      
      return fragment.content;      
    }

    _registerEvents( eventBus: EventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDUM, this._componentDidUnMount.bind(this));
    }
  
    _createResources() {
        this._element = this._createDocumentElement(this.tagName);
    }

    init() {
      this._createResources();  
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  
    async _componentDidMount() {
      await this.componentDidMount();

      Object.values(this.children).forEach(child => {
        child.dispatchComponentDidMount();
      });
    }

    _componentDidUnMount() {
      Object.values(this.children).forEach(child => {
        child.dispatchComponentDidUnMount();
      });

      this.componentDidUnMount();
    }

    componentDidMount() : void {}
    componentDidUnMount() : void {}
    
    dispatchComponentDidMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }

    dispatchComponentDidUnMount() {
        this.eventBus.emit(Block.EVENTS.FLOW_CDUM);
    }

    _componentDidUpdate( oldProps: Record<string, unknown>,
                           newProps: Record<string, unknown>): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }
    
    componentDidUpdate( 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _oldProps: Record<string, unknown>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
      _newProps: Record<string, unknown>
      ): boolean {
      return true;
    }
  
    setProps(nextProps: { [key: string]: unknown }): void {
      if (!nextProps) {
        return;
      }
  
      Object.assign(this.props, nextProps);
    };
  
    setEvents(nextEvent: Events): void {
      if (!nextEvent) {
        return;
      }
      Object.assign(this.events, nextEvent);
      this._removeEvents();
      this._addEvents();
    };
  
    get element() {
      return this._element;
    }
  
    _render() {
      //'block render');
      const block = this.render();
      this._removeEvents();
      this._element.innerHTML = '';

      this._element.appendChild(block);
      this.addAttribute();
      this._addEvents();
    }
  
    render() : DocumentFragment /*| string*/ { return new DocumentFragment()}
  
    protected _removeEvents(): void {
      if (!this.events) return;

      Object.entries( this.events).forEach(([eventName, handler]) => {
        this._element.removeEventListener(defEventList[eventName as keyof typeof defEventList], handler as EventListener);
      });
    }

    protected _addEvents(): void {
      if (!this.events) return;
  
      Object.entries(this.events).forEach(([eventName, handler]) => {
//        console.log( eventName);
        this._element.addEventListener(defEventList[eventName as keyof typeof defEventList], handler as EventListener);
      });
    }

    getContent() {
      return this.element;
    }

    private _makePropsProxy<T extends BlockProps | Children | Events>(obj: T): T {
      // eslint-disable-next-line
        const _self = this;
      
        const handler: ProxyHandler<T> = {
          get(target, prop: string) {
            const value = target[prop];
            return typeof value === "function" ? value.bind(target) : value;
          },
          set(target, prop: string, value: unknown) {
            const oldValue = { ...target };
            target[prop] = value;
            
            if ('eventBus' in _self) {
              _self.eventBus.emit(Block.EVENTS.FLOW_CDU, oldValue, target);
            }
            return true;
          },
          deleteProperty() {
            throw new Error("Удаление запрещено");
          }
        };
      
        return new Proxy(obj, handler);
      }

      _createDocumentElement(tagName: string) {
          return document.createElement(tagName);
    }

    public getFormData(): Record<string, string | Blob> {
      if (!this._element) return {};
      
      const formData = new FormData(this._element as HTMLFormElement);
      const result: Record<string, string | Blob> = {};

      formData.forEach((value, key) => {
        result[key] = value;
      });

      return result;
    };

    show() {
      this.getContent().style.display = "block";
    }
  
    hide() {
      this.getContent().style.display = "none";
    }  
  }
