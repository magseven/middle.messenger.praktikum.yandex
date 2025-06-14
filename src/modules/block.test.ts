/**
 * @jest-environment jsdom
 */
// block.test.ts
import { Block } from './block';

jest.mock('uuid', () => ({
  v4: jest.fn(() => '12345')
}));

class TestBlock extends Block {
  render() {
    return document.createDocumentFragment();
  }
}

describe('Block', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Создается компонент корректного типа', () => {
    const block = new TestBlock('BUTTON', {});  
    expect(block.element.tagName).toBe('BUTTON');
  });

  it('Атрибуты передаются корректно', () => {
    const block = new TestBlock('button', { attrs: { class: 'testClass'}});  
    expect(block.element.className).toBe('testClass');
  });

  it('Разделение children и props происходит корректно ', () => {
    const propsAndChildren = {
      text: 'Hello',
      child: new TestBlock(),
    };    
    
    const block = new TestBlock('div', propsAndChildren);
    
    expect(block.props.text).toBe('Hello');
    expect(block.children.child).toBe(propsAndChildren.child);
  });

  it('Значения свойств устанавливаются корректно', () => {
    const block = new TestBlock();    
    block.setProps({ test: 'value' });
    
    expect(block.props.test).toBe('value');
  });

  it('Проверка на наличие вызова метода componentDidMount', () => {
    const block = new TestBlock();
    const mockCDM = jest.spyOn(block, 'componentDidMount');
    
    block.dispatchComponentDidMount();
    expect(mockCDM).toHaveBeenCalled();
  });

  it('Проверка на наличие вызова метода componentDidUnMount', () => {
    const block = new TestBlock();
    const mockCDUM = jest.spyOn(block, 'componentDidUnMount');
    
    block.dispatchComponentDidUnMount();
    expect(mockCDUM).toHaveBeenCalled();
  });

  it('Шаблонизатор выполняется корректно', () => {
    const childBlock = new TestBlock();
    const block = new TestBlock('div', {
      child: childBlock,
      text: 'Parent'
    });
    
    const template = '<div>{{text}}{{child}}</div>';
    const result = block.compile(template, block.props);
    
    expect(result.querySelector(`[data-id="${childBlock.id}"]`)).toBeNull(); 
  });

  it('Проксирование работает корректно', () => {
    const block = new TestBlock( 'div', { test: 'value'});
    block.props.test = 'new value';

    expect(block.props.test).toBe('new value');
    expect(() => {
      delete block.props.test;
    }).toThrow('Удаление запрещено');
  });
});
