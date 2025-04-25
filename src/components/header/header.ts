//import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import headerTemplate from './header.tmpl';

//Handlebars.registerPartial( 'header', headerTemplate);

class Header extends Block {
    constructor(props: BlockProps) {
      super("div", {...props, 
                    attrs: {
                      class: 'a-theme a-header a-theme-color', 
                    },
                    icon: '../static/images/cloud.png',
                    icon_descr: 'облако'});
    }
  
    render() : DocumentFragment {
      return this.compile(headerTemplate, { page_title: this.props.title, theme_icon_descr: this.props.icon_descr, theme_icon: this.props.icon });
    }
 }

export default Header;

