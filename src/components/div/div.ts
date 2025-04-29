import { Block, BlockProps } from "../../modules/block";
import template from './div.tmpl';

class Div extends Block {
    constructor(props: BlockProps) {
      super('div', {
        ...props, 
        attrs: {
          ...props.attrs || {},
          // class: 'a-theme a-button a-theme-color'
        }
      });
    }
  
    render() : DocumentFragment {
      return this.compile( template, this.props);
    }
 }

export default Div;
