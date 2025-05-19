import {getCurrentPage} from '../../modules/utils/common'
//import pageData from '../../modules/utils/form_funcs';

import { Block, BlockProps } from "../../modules/block";

import { blockData } from '../../models/page_data'

export class Page extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,
                        }); 
    }

    render() : DocumentFragment {
        const page = blockData[getCurrentPage()] || blockData.index;
        return this.compile( page.template, {...this.props});
    }
}

export class Index extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,}); 
    }

    render() : DocumentFragment {
        const page = blockData.index;
        return this.compile( page.template, {...this.props});
    }
}

export class Login extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,}); 
    }

    render() : DocumentFragment {
        const page = blockData.login;
        return this.compile( page.template, {...this.props});
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

export class Signup extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,}); 
    }

    render() : DocumentFragment {
        const page = blockData.signup;
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
