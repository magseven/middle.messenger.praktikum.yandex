import {pageData} from '../../modules/utils/form_funcs';
import { Block, BlockProps } from "../../modules/block";
import { blockData } from '../../models/page_data'
import { BlockEntry, defContentRecord } from '../../modules/types'

export class Page extends Block {
    _template: string = '';
    _context: defContentRecord = {};

    constructor(props: BlockProps) {
        super("section", props);         
    }

    render() : DocumentFragment {
        console.log('page.render1', blockData.index.context);
        return this.compile( blockData.index.template, pageData(blockData.index.context) as BlockProps);
    }
}

export class Index extends Page {
    constructor() {
        super( blockData.index); 
    }
}

export class Login extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,}); 
    }

    render() : DocumentFragment {
        return this.compile( blockData.login.template, pageData(blockData.login.context) as BlockProps);
    }
}

export class Profile extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,}); 
    }

    render() : DocumentFragment {
        const page = blockData.profile;
        return this.compile( page.template, {...this.props});
    }
}

export class Chats extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,}); 
    }

    render() : DocumentFragment {
        const page = blockData.chat;
        return this.compile( page.template, {...this.props});
    }
}

export class Signin extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,}); 
    }

    render() : DocumentFragment {
        const page = blockData.signin;
        return this.compile( page.template, {...this.props});
    }
}

export class Page_404 extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,}); 
    }

    render() : DocumentFragment {
        const page = blockData.page_404;
        return this.compile( page.template, {...this.props});
    }
}

export class Page_500 extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,}); 
    }

    render() : DocumentFragment {
        const page = blockData.page_500;
        return this.compile( page.template, {...this.props});
    }
}

/*

function render(query: string, block: Page) {
      const root = document.querySelector(query);
      root!.replaceWith(block.getContent());
      return root;
}

if (!window.eventBus) {
    window.eventBus = new EventBus();
}

const data = blockData[getCurrentPage()] || blockData.index;
const page = new Page( pageData( data.context) as BlockProps);   

render(".app", page);
*/
