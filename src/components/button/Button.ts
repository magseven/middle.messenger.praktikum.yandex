// components/button/Button.js
import Handlebars from 'handlebars';

import { Block } from "../../modules/block";
//import { template } from "./template";


import buttonTemplate from './button.tmpl';

Handlebars.registerPartial( 'button', buttonTemplate);

class Button extends Block {
    constructor(props: { [key: string]: unknown }) {
      super("button", props);
    }
  
    render() {
//        const template = Handlebars.compile( buttonTemplate);
//        return template({});        
      return `<div>${this.props.text}</div>`;
    }
  }
  
  function render(query: string, block: Block) {
    const root = document.querySelector(query);
    root!.appendChild(block.getContent());
    return root;
  }
  
  const button = new Button({
    text: 'Click me',
    type: 'submit',
    clas: "a-theme a-button a-theme-color",
  });
  // app � ��� class ���� � ����� DOM
  render(".app", button);
  
//  // ����� ������� ������� ��������� ���, ���������� �������� ������
  setTimeout(() => {
    button.setProps({
        text: 'Click me, please',
    });
  }, 1000);

  console.log('before render');
