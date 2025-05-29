import { Block, BlockProps } from "../../modules/block";
import template from './template';

type typeOption = { id: number, text: string};

export default class ComboBox extends Block {
  constructor(props: BlockProps) {
    super("select", { 
      ...props, 
      options: [{ id: 1, text: 'Элемент 1' },
                { id: 2, text: 'Элемент 2' },
                { id: 3, text: 'Элемент 3' }
              ],
      attrs: {
        ...props.attrs || {},
      },
    });
  }

  componentDidMount() {
      console.log( 'componentDidMount');
      this._updateOptions();
  }

  componentDidUpdate( oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
      if ( oldProps.options !== newProps.options) {
          console.log( 'componentDidUpdate');
          this._updateOptions();
      }
      return true;
  }  

  _updateOptions() {
    (this.props.options as typeOption[]).forEach( opt => {
      const option = document.createElement('option');
      option.value = String( opt.id);
      option.textContent = opt.text;
      this.element.appendChild(option);
    });
  }

  render() : DocumentFragment {
    return this.compile( template, this.props);
  }

}


