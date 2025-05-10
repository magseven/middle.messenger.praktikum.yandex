import { Block, BlockProps } from "../../modules/block";
import template from './nav.tmpl';

class Nav extends Block {
    constructor(props: BlockProps) {
        super("nav", {...props,
                        }); 
    }

    render() : DocumentFragment {
        return this.compile( template, this.props);
    }
}
  
export default Nav;
