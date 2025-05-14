import { Block, BlockProps } from "../../modules/block";

export class Page extends Block {
    constructor(props: BlockProps) {
        super("section", props);         
    }

    render() : DocumentFragment {
        return this.compile( this.props.template as string, this.props);
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
