import { Block, BlockProps } from "../../modules/block";
import template from './heading.tmpl';

type HRTagName = 'h1' | 'h2' | 'h3';

class Heading extends Block {
    constructor( props: BlockProps) {
      super( 'h1', {
        ...props, 
        // attrs: {
        //   ...props.attrs || {},
        // }
      });
    }
  
    render() : DocumentFragment {
      console.log( 'hr', template, this.props);
      return this.compile( template, this.props);
    }
 }

export default Heading;
