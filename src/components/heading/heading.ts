import { Block, BlockProps } from "../../modules/block";
import template from './heading.tmpl';

//type HRTagName = 'h1' | 'h2' | 'h3';

class Heading extends Block {
    constructor( props: BlockProps) {
      console.log('HEADING constructor');
      super( 'h1', {
        ...props, 
      });
    }
  
    render() : DocumentFragment {
      console.log('HEADING render');
      return this.compile( template, this.props);
    }
 }

export default Heading;
