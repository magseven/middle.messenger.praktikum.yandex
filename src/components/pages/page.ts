import {getCurrentPage} from '../../modules/utils/common'
import {pageData} from '../../modules/utils/form_funcs';

import { Block, BlockProps } from "../../modules/block";

import { blockData } from '../../models/page_data'
class Page extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,
                            // attrs: {
                            //    class: 'a-login-container',
                            // },
                            // events: {
                            //     click: (e: MouseEvent) => {
                            //       console.log('A Clicked');
                            //     //   e.preventDefault();
                            //     //   e.stopPropagation();
                            //     },
                            //     submit: (e: SubmitEvent) => {
                            //     console.log('submit Event');
                            //     printFormData();
                            //     e.preventDefault();
                            //     e.stopPropagation();
                            //     },
                            // },
                        }); 
        //console.log( 'props', props);
    }

    render() : DocumentFragment {
        const page = blockData[getCurrentPage()] || blockData.index;
        //console.log('page', page);
        return this.compile( page.template, {...this.props});
    }
}
  
function render(query: string, block: Page) {
      const root = document.querySelector(query);
      root!.replaceWith(block.getContent());
      return root;
}

const data = blockData[getCurrentPage()] || blockData.index;
const page = new Page( pageData( data.context) as BlockProps);       
render(".app", page);

// setTimeout(() => {
//     page.setProps({
//         buttonText: 'Click me, please',
//     });
// }, 1000);
