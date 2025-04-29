import { Block, BlockProps } from "../../modules/block";
import template from './nav.tmpl';

class Nav extends Block {
    constructor(props: BlockProps) {
        super("nav", {...props,
                            // attrs: {
                            //    class: 'a-login-container',
                            // },
                            //events: {
                                // click: (e: Event) => {
                                //     if (e instanceof MouseEvent) {
                                //         console.log('Mouse event at:', e.clientX, e.clientY);
                                //     }
                                //     console.log('A Clicked');
                                //     e.preventDefault();
                                //     e.stopPropagation();
                                // },
                            //},
                        }); 
    }

    render() : DocumentFragment {
        return this.compile( template, this.props);
    }
}
  
export default Nav;
