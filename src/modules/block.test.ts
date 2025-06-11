/**
 * @jest-environment jsdom
 */
// block.test.ts
import { Block } from './block';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '12345')
}));

describe('Block', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  class TestBlock extends Block {
    render() {
      return document.createDocumentFragment();
    }
  }

  it('should initialize with default values', () => {
    const block = new TestBlock();
    
    expect(block.id).toBe('12345');
    expect(block.tagName).toBe('div');
    expect(block.props).toEqual({});
    expect(block.children).toEqual({});
    expect(block.events).toEqual({});
  });

  it('should initialize with custom tag and props', () => {
    const props = { attr: { class: 'test' }, text: 'Hello' };
    const block = new TestBlock('section', props);
    
    expect(block.tagName).toBe('section');
    expect(block.props).toEqual(props);
  });

  it('should separate children from props', () => {
    const childBlock = new TestBlock();
    const propsAndChildren = {
      text: 'Hello',
      child: childBlock,
      events: { OnClick: jest.fn() }
    };
    
    const block = new TestBlock('div', propsAndChildren);
    
    expect(block.props.text).toBe('Hello');
    expect(block.children.child).toBe(childBlock);
    expect(Object.keys(block.events).length).toBe(1);
  });

  it('should set props and trigger update', () => {
    const block = new TestBlock();
    const mockEmit = jest.spyOn(block.eventBus, 'emit');
    
    block.setProps({ test: 'value' });
    
    expect(block.props.test).toBe('value');
    expect(mockEmit).toHaveBeenCalledWith('flow:component-did-update', {}, { test: 'value' });
  });

  it('should handle events', () => {
    const mockClick = jest.fn();
    const block = new TestBlock('div', {
      events: { OnClick: mockClick }
    });
    
    block.init();
    const clickEvent = new Event('click');
    block.getContent().dispatchEvent(clickEvent);
    
    expect(mockClick).toHaveBeenCalledWith(clickEvent);
  });

  it('should call componentDidMount lifecycle method', () => {
    const block = new TestBlock();
    const mockCDM = jest.spyOn(block, 'componentDidMount');
    
    block.dispatchComponentDidMount();
    
    expect(mockCDM).toHaveBeenCalled();
  });

  it('should call componentDidUnmount lifecycle method', () => {
    const block = new TestBlock();
    const mockCDUM = jest.spyOn(block, 'componentDidUnMount');
    
    block.dispatchComponentDidUnMount();
    
    expect(mockCDUM).toHaveBeenCalled();
  });

  it('should compile template with children', () => {
    const childBlock = new TestBlock();
    const block = new TestBlock('div', {
      children: { child: childBlock },
      text: 'Parent'
    });
    
    const template = '<div>{{text}}{{child}}</div>';
    const result = block.compile(template, block.props);
    
    expect(result.querySelector(`[data-id="${childBlock.id}"]`)).toBeNull(); // replaced with child content
  });

  it('should show and hide element', () => {
    const block = new TestBlock();
    block.init();
    
    block.hide();
    expect(block.getContent().style.display).toBe('none');
    
    block.show();
    expect(block.getContent().style.display).toBe('block');
  });

  it('should get form data', () => {
    const block = new TestBlock('form');
    block.init();
    
    // Mock form elements
    const input = document.createElement('input');
    input.name = 'test';
    input.value = 'value';
    block.getContent().appendChild(input);
    
    const formData = block.getFormData();
    expect(formData).toEqual({ test: 'value' });
  });

  it('should make props proxy', () => {
    const block = new TestBlock();
    const proxy = block['_makePropsProxy']({ test: 'value' });
    
    proxy.test = 'new value';
    expect(proxy.test).toBe('new value');
    
    expect(() => {
      //delete proxy.test;
    }).toThrowError('Удаление запрещено');
  });
});