// components/button/Button.js
import {Block} from "../../../modules/block";
// Ваш реализованный шаблонизатор
//import { compile } from "../../utils/templator";
import { template } from "./template";

class Button extends Block {
    constructor(props: { [key: string]: unknown }) {
          // Создаём враппер дом-элемент button
      super("button", props);
    }
  
    render() {
          // В проект должен быть ваш собственный шаблонизатор
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
  // app — это class дива в корне DOM
  render(".app", button);
  
  // Через секунду контент изменится сам, достаточно обновить пропсы
  setTimeout(() => {
    button.setProps({
      text: 'Click me, please',
    });
  }, 1000);

  console.log('before render');
