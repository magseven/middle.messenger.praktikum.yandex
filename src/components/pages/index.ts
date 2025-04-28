import {getCurrentPage} from '../../modules/utils/common'
// import { initFormValidation } from '../../modules/utils/validation';
import {pageData} from '../../modules/utils/form_funcs';

import { Block, BlockProps } from "../../modules/block";

import { blockData } from '../../models/page_data'

class Index extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,
            class: 'a-login-container',
        }); 
    }

    render() : DocumentFragment {
        const page = blockData[getCurrentPage()] || blockData.index;
        return this.compile( page.template, {/*menu: data.context.menu*/});
    }
}
  
function render(query: string, block: Index) {
    const root = document.querySelector(query);
    root!.replaceWith( block.getContent());
    return root;
}

const data = blockData[getCurrentPage()] || blockData.index;

const page = new Index( pageData(data.context));       
render(".app", page);

// setTimeout(() => {
//     page.setProps({
//         buttonText: 'Click me, please',
//     });
// }, 1000);

// <nav class="a-login-container">
//       <h1>Sprint_2</h1>
//       <ul>
//         {{#each menu}} <li><a class="a-link" href="./{{{this.[0]}}}">{{{this.[1]}}}</a></li> {{/each}}
//       </ul>
//     </nav>
