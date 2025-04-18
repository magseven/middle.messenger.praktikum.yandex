import { EventBus } from "./event_bus";

// Нельзя создавать экземпляр данного класса
export class Block {
    static EVENTS = {
      INIT: "init",
      FLOW_CDM: "flow:component-did-mount",
      FLOW_CDU: "flow:component-did-update",
      FLOW_RENDER: "flow:render"
    };
  
    _element!: HTMLElement;
    
    _meta: {
        tagName: string;
        props: { [key: string]: unknown };
    };
    
    props: { [key: string]: unknown };
    
    eventBus: EventBus;
  
    /** JSDoc
     * @param {string} tagName
     * @param {Object} props
     *
     * @returns {void}
     */
    constructor(tagName = "div", props = {}) {
      this._meta = {
        tagName,
        props
      };
  
      this.props = this._makePropsProxy(props);

      this.eventBus = new EventBus();
  
      this._registerEvents( this.eventBus);
      this.eventBus.emit(Block.EVENTS.INIT);
    }
  
    _registerEvents( eventBus: EventBus) {
      eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
      eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
      eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }
  
    _createResources() {
        const { tagName, props } = this._meta;
        this._element = this._createDocumentElement(tagName);

        for ( const p in props) {
            this.element.setAttribute(p, String( props[p]));
        }
    }
  
    init() {
      this._createResources();
  
      this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  
    _componentDidMount() {
      this.componentDidMount();
    }
  
    componentDidMount( oldProps: Record<string, unknown> = {}) : void {}
  
      dispatchComponentDidMount() {
          this.eventBus.emit(Block.EVENTS.FLOW_CDM);
    }
  
    _componentDidUpdate( oldProps: Record<string, unknown>,
                           newProps: Record<string, unknown>): void {
        const response = this.componentDidUpdate(oldProps, newProps);
        if (!response) {
            return;
        }
        this._render();
    }
  
    componentDidUpdate( oldProps: Record<string, unknown>,
                        newProps: Record<string, unknown>): true {
      return true;
    }
  
    setProps = (nextProps: { [key: string]: unknown }): void => {
      if (!nextProps) {
        return;
      }
  
      Object.assign(this.props, nextProps);
    };
  
    get element() {
      return this._element;
    }
  
    _render() {
      const block = this.render();
      // Этот небезопасный метод для упрощения логики
      // Используйте шаблонизатор из npm или напишите свой безопасный
      // Нужно не в строку компилировать (или делать это правильно),
      // либо сразу в DOM-элементы возвращать из compile DOM-ноду
        this._element.innerHTML = block;
    }
  
    render() {}
  
    getContent() {
      return this.element;
    }
  
    _makePropsProxy(props: { [key: string]: unknown }) {
      // Можно и так передать this
      // Такой способ больше не применяется с приходом ES6+
      const self = this;
  
      return new Proxy(props, {
        get(target, prop: string) {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        set(target, prop: string, value) {
          target[prop] = value;
          
          // Запускаем обновление компоненты
          // Плохой cloneDeep, в следующей итерации нужно заставлять добавлять cloneDeep им самим
          self.eventBus.emit(Block.EVENTS.FLOW_CDU, /*{...target}, target*/);
          return true;
        },
        deleteProperty() {
          throw new Error("Нет доступа");
        }
      });
    }
  
    _createDocumentElement(tagName: string) {
      // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
      return document.createElement(tagName);
    }
  
    show() {
      this.getContent().style.display = "block";
    }
  
    hide() {
      this.getContent().style.display = "none";
    }
  }