// components/button/Button.js
import {Block} from "../../../modules/block";
// ��� ������������� ������������
//import { compile } from "../../utils/templator";
import { template } from "./template";

class Button extends Block {
    constructor(props: { [key: string]: unknown }) {
          // ������ ������� ���-������� button
      super("button", props);
    }
  
    render() {
          // � ������ ������ ���� ��� ����������� ������������
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
  });
  
  console.log('before render', button);
  // app � ��� class ���� � ����� DOM
  render(".app", button);
  
  // ����� ������� ������� ��������� ���, ���������� �������� ������
  setTimeout(() => {
    button.setProps({
      text: 'Click me, please',
    });
  }, 1000);

  console.log('before render');
