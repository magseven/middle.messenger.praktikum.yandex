import {getCurrentPage} from '../../modules/utils/common'
import {pageData} from '../../modules/utils/form_funcs';

import { Block, BlockProps } from "../../modules/block";

import { blockData } from '../../models/page_data'
import {EventBus} from '../../modules/event_bus'

class Page extends Block {
    constructor(props: BlockProps) {
        super("section", {...props,
                        }); 
    }

    render() : DocumentFragment {
        const page = blockData[getCurrentPage()] || blockData.index;
        return this.compile( page.template, {...this.props});
    }
}
    
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
