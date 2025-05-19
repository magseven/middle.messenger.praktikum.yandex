import { isEqual, render } from './utils/common';
import {Block, BlockProps} from './block'
import {BlockEntry, defContentRecord} from './types'
import pageData from './utils/form_funcs'

export default class Route {
    private _pathname: string = '';
    private _blockClass: new (props: BlockProps) => Block;
    private _block: Block | null;
    private _blockcontext: defContentRecord = {};
    private _blocktemplate: string;
    private _props: Record<string, string> = {};

    constructor(pathname: string, blockClass: new (props: BlockProps) => Block, blockentry: BlockEntry, props: Record<string, string>) {
        this._pathname = pathname;
        this._blockClass = blockClass;
        this._block = null;
        this._blockcontext = blockentry.context;
        this._blocktemplate = blockentry.template;
        this._props = props;
    }

    pathname() {
        return this._pathname;
    }

    props() {
        return this._props;
    }

    navigate(pathname: string) {
        if (this.match(pathname)) {
            this._pathname = pathname;
            this.render();
        }
    }

    leave() {
        if (this._block) {
            this._block.dispatchComponentDidUnMount();
            this._block = null;
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {

        if (!this._block)
            this._block = new this._blockClass( pageData( {...this._blockcontext, 'template': this._blocktemplate}) as BlockProps);

        render(this._props.rootQuery as string, this._block);
        return;
    }
}

// const route = new Route('/buttons', Button, { rootQuery: '.app',});

// route.render();

// console.log(route.pathname(), route.props());

// route.navigate('/buttons');
// route.navigate('/trash');
// route.leave();


