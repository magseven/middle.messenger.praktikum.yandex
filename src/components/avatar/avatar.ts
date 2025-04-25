//import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import avatarTemplate from './avatar.tmpl';

//Handlebars.registerPartial( 'avatar', avatarTemplate);

class Avatar extends Block {
    constructor(props: BlockProps) {
      super("label", {
        ...props, 
        attrs: {
          ...props.attrs || {},
          class: 'a-avatar'
        }
      });
    }
  
    render() : DocumentFragment {
      return this.compile(avatarTemplate, {});
    }
 }

export default Avatar;
