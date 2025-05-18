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
  
    if ( root) {
        root.innerHTML = '';
        root.appendChild( block.getContent());
    }
    
    return root;
}

function trim(string, chars) {
    let str = ' ' + string + ' ';

    if (str && chars === undefined) {
        return string.trim();
    }

    if (!str || !chars) {
        return (string || '');
    }

    const regFirst = new RegExp(` ${chars}`, 'gi');
    const regSecond = new RegExp(`${chars} `, 'gi');

    return str
      .replace(regFirst, '')
      .replace(regSecond, '')
      .trim();
}
