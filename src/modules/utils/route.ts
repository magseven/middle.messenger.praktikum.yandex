import { isEqual, render } from './common';
import {Block, BlockProps} from '../block'

export class Route {
    private _pathname: string = '';
    private _blockClass: new (props: BlockProps) => Block;
    private _block: Block | null;
    private _props: BlockProps = {};

    constructor(pathname: string, blockClass: new (props: BlockProps) => Block, props: Record<string, string>) {
        this._pathname = pathname;
        this._blockClass = blockClass;
        this._block = null;
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
            this._block.hide();
        }
    }

    match(pathname: string) {
        return isEqual(pathname, this._pathname);
    }

    render() {

        if (!this._block) {
            this._block = new this._blockClass( this._props);
            console.log(this._props.rootQuery);
            render(this._props.rootQuery as string, this._block);
            return;
        }

        this._block.show();
    }
}

// const route = new Route('/buttons', Button, { rootQuery: '.app',});

// route.render();

// console.log(route.pathname(), route.props());

// route.navigate('/buttons');
// route.navigate('/trash');
// route.leave();


