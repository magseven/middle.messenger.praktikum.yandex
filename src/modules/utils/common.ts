import {Block} from '../block';

export const getCurrentPage = () : string => {
    const str : string[] = window.location.pathname.split('/').filter(part => part !== '');
    return !str.length ? "index" : str[str.length - 1];
};

export function isEqual(lhs: string, rhs: string) {
    return lhs === rhs;
}

export function render(query: string, block: Block) : HTMLElement | null {
    const root: HTMLElement | null = document.querySelector(query);
  
    console.log('render', query);
    if ( root) {
        root.innerHTML = '';
        root.appendChild( block.getContent());
    }
    
    return root;
}


