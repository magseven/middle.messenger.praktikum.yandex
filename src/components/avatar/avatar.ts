import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import avatarTemplate from './avatar.tmpl';

Handlebars.registerPartial( 'avatar', avatarTemplate);

class Header extends Block {
    constructor(props: BlockProps) {
      super("label", {...props, className: 'a-avatar'});
    }
  
    render() : DocumentFragment {
      return this.compile(avatarTemplate, { page_title: this.props.title, theme_icon_descr: this.props.icon_descr, theme_icon: this.props.icon });
    }
 }

export default Header;
