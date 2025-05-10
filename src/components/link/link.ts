import { Block, BlockProps } from "../../modules/block";
import template from './link.tmpl';

class Link extends Block {
    constructor( props: BlockProps) {
      super( 'a', {
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

export default Link;
