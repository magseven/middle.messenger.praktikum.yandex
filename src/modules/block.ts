import { EventBus } from "./event_bus";

// ������ ��������� ��������� ������� ������
class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render"
  };

  _element = null;
  _meta = null;

  /** JSDoc
   * @param {string} tagName
   * @param {Object} props
   *
   * @returns {void}
   */
  constructor(tagName = "div", props = {}) {
    const eventBus = new EventBus();

    this._meta: { tagName: string; props: {} } = {
      tagName,
      props
    };

    props = this._makePropsProxy(props);

    eventBus = () => eventBus;

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    const { tagName } = this._meta;
    this._element = this._createDocumentElement(tagName);
  }

  init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount(oldProps) {}

    dispatchComponentDidMount() {
        this._eventBus().emit(Block.EVENTS.FLOW_CDM);
    }

  _componentDidUpdate(oldProps, newProps) {
    ...
  }

  componentDidUpdate(oldProps, newProps) {
    return true;
  }

  setProps = nextProps => {
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
    // ��� ������������ ����� ��� ��������� ������
    // ����������� ������������ �� npm ��� �������� ���� ����������
    // ����� ������������� �� � ������ (��� ������ ��� ���������),
    // ���� ����� ���������� � DOM-�������� � ���������� �� compile DOM-����
    this._element.innerHTML = block;
  }

    // ���������������� �������������. ���������� ������� ��������
  render() {}

  getContent() {
    return this.element;
  }

  _makePropsProxy(props) {
    // ��� ���� ������ �������� this, �� �� ������ �� ����������� � �������� ES6+
    const self = this;

        // ����� ��� ��������� ����������� �����
    return props;
  }

  _createDocumentElement(tagName) {
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

export default Block;