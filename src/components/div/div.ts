import { Block, BlockProps } from "../../modules/block";
import template from './div.tmpl';

class Div extends Block {
    constructor(props: BlockProps) {
      super('div', {
        ...props, 
        attrs: {
          ...props.attrs || {},
        }
      });
    }
  
    render() : DocumentFragment {
      return this.compile( template, this.props);
    }
 }

export default Div;
