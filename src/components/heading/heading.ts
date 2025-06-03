import { Block, BlockProps } from "../../modules/block";
import template from './heading.tmpl';

class Heading extends Block {
    constructor( props: BlockProps) {
      super( 'h1', {
        ...props, 
      });
    }
  
    render() : DocumentFragment {
      return this.compile( template, this.props);
    }
 }

export default Heading;
