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
    if ( root)
        root.replaceWith( block.getContent());

    return root;
}


