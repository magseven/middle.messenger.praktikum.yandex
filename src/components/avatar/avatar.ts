import { Block, BlockProps } from "../../modules/block";
import tmplAvatar from './avatar.tmpl';

class Avatar extends Block {
    constructor(props: BlockProps) {
      super("label", {
        ...props, 
        attrs: {
          ...props.attrs || {},
          class: 'a-avatar'
        },
//         image: new Img({
//           attrs: {
//             src: imgAvatar,
//             alt: "Аватар",
//           }          
//         }), 
//         input: new Input({
//           attrs: {
//             type: 'file',
//             accept: 'image/*',
//             name: 'avatar',
//             width: '200px',
//             height: '200px',
// //            hidden: true,
//           },
//           events: {
//             OnClick: (e: Event) => {
//               e.preventDefault();
//               e.stopPropagation();
//               console.log('onchange');
//               //this.eventBus.emit( 'onSelectItem', this.props);
//             },
//           },
//        }),
      })
    };
  
    render() : DocumentFragment {
      return this.compile(tmplAvatar, {});
    }
 }

export default Avatar;
