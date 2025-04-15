import Block from "../block";

// utils/renderDOM.js
export function render(query: string, block: Block) {
    const root = document.querySelector(query);
  
    // ����� ���������� �� ���������� ������ ������ Block
    root!.appendChild( block.getContent());
    block.dispatchComponentDidMount();  
    return root;
  } 