import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import headerTemplate from './header.tmpl';

Handlebars.registerPartial( 'header', headerTemplate);

class Header extends Block {
    constructor(props: BlockProps) {
      super("div", props);
    }
  
    render() : DocumentFragment {
      return this.compile(headerTemplate, { page_title: this.props.text, theme_icon_descr: this.props.icon_descr, theme_icon: this.props.icon });
    }
 }

export default Header;

//  class="a-theme a-header a-theme-color
//  label=title_auth theme_icon="../static/images/cloud.png" theme_icon_descr="������"}}
