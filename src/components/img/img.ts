import { Block, BlockProps } from "../../modules/block";
import template from './img.tmpl';

class Img extends Block {
    constructor(props: BlockProps) {
      super('img', props);
    }
  
    render() : DocumentFragment {
      return this.compile( template, this.props);
    }
 }

export default Img;
