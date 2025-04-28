import { Block, BlockProps } from "../../modules/block";
import template from './paragraph.tmpl';

class Paragraph extends Block {
    constructor( props: BlockProps) {
      super( 'p', {
        ...props, 
      });
    }
  
    render() : DocumentFragment {
      return this.compile( template, this.props);
    }
 }

export default Paragraph;
