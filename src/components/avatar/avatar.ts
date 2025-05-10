import { Block, BlockProps } from "../../modules/block";
import Img from "../img/img";
import {Input} from "../input/input";
import tmplAvatar from './avatar.tmpl';
import imgAvatar from '../../static/images/avatar.svg';

class Avatar extends Block {
    constructor(props: BlockProps) {
      super("label", {
        ...props, 
        attrs: {
          ...props.attrs || {},
          class: 'a-avatar'
        },
        image: new Img({
          attrs: {
            src: imgAvatar,
            alt: "Аватар",
          }
        }), 
        input: new Input({
          attrs: {
            type: 'file',
            accept: 'image/*',
            name: 'avatar',
            hidden: true,
          }
        }),
      })
    };
  
    render() : DocumentFragment {
      return this.compile(tmplAvatar, {});
    }
 }

export default Avatar;
