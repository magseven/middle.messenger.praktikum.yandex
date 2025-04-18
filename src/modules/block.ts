import { EventBus } from "./event_bus";

// ������ ��������� ��������� ������� ������
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
      // ���� ������������ ����� ��� ��������� ������
      // ����������� ������������ �� npm ��� �������� ���� ����������
      // ����� �� � ������ ������������� (��� ������ ��� ���������),
      // ���� ����� � DOM-�������� ���������� �� compile DOM-����
        this._element.innerHTML = block;
    }
  
    render() {}
  
    getContent() {
      return this.element;
    }
  
    _makePropsProxy(props: { [key: string]: unknown }) {
      // ����� � ��� �������� this
      // ����� ������ ������ �� ����������� � �������� ES6+
      const self = this;
  
      return new Proxy(props, {
        get(target, prop: string) {
          const value = target[prop];
          return typeof value === "function" ? value.bind(target) : value;
        },
        set(target, prop: string, value) {
          target[prop] = value;
          
          // ��������� ���������� ����������
          // ������ cloneDeep, � ��������� �������� ����� ���������� ��������� cloneDeep �� �����
          self.eventBus.emit(Block.EVENTS.FLOW_CDU, /*{...target}, target*/);
          return true;
        },
        deleteProperty() {
          throw new Error("��� �������");
        }
      });
    }
  
    _createDocumentElement(tagName: string) {
      // ����� ������� �����, ������� ����� ��������� � ����� ������ ����� ��������� ������
      return document.createElement(tagName);
    }
  
    show() {
      this.getContent().style.display = "block";
    }
  
    hide() {
      this.getContent().style.display = "none";
    }
  }