import { Block, BlockProps } from "../../modules/block";
import template from './template';

export default class ComboBox extends Block {
  constructor(props: BlockProps) {
    super("select", { 
      ...props, 
      options: props.options,
      attrs: {
        ...props.attrs || {},
      },
    });
  }

  // componentDidMount() {
  //     console.log( 'componentDidMount');
  // }

  // componentDidUpdate( oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
  //     if ( oldProps.options !== newProps.options) {
  //         console.log( 'componentDidUpdate');
  //     }
  //     return true;
  // }  

  set options( data: Record<string, string|number>[]) {
    data.forEach( opt => {
      const option = document.createElement('option');
      option.value = String( opt.id);
      option.textContent = String(opt.login);
      this.element.appendChild(option);
    });
  }

  get value() {
    return (this.element as HTMLSelectElement).value;
  }

  get selectedId(): number {
    const select = this.element as HTMLSelectElement;
    if ( select.selectedIndex == -1)
      return 0;

    const selectedOption = select.options[select.selectedIndex];    
    return Number(selectedOption.value); 
  }

  set selectedIndex( index: number) {
    const select = this.element as HTMLSelectElement;
    select.selectedIndex = index;
  }

  render() : DocumentFragment {
    return this.compile( template, this.props);
  }

}


