import { defContentRecord, defProto } from '../types';
import { Children, BlockProps, Block } from '../block';
import Nav from '../../components/nav/nav';
import Header from '../../components/header/header';
import Form from '../../components/form/form';
import Input from '../../components/input/input';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/avatar';
import Heading from '../../components/heading/heading';
import Link from '../../components/link/link';
import Paragraph from '../../components/paragraph/paragraph';

type BlockClass = typeof Input | typeof Button | typeof Avatar | typeof Paragraph | typeof Heading | typeof Link | typeof Nav | typeof Header | typeof Form
const classRegistry: Record<string, BlockClass> = {
      Input,
      Button,
      Avatar,
      Heading,
      Paragraph,
      Link, 
      Nav,
      Header,
      Form
}; 
  
export const pageData = ( item: defContentRecord): BlockProps | string | Block => {
      let result: BlockProps = {};

      if ( typeof item === 'string')
            return item;

      if ( Object.hasOwn( item, 'proto') && ( typeof item.proto === 'string'))
            return new classRegistry[item.proto]( pageData( Object.entries( item).reduce(( acc, it) => ({...acc,...it[0] != 'proto' && {[it[0]]: it[1]}}), {})) as BlockProps);
      
      Object.entries( item).forEach(([key, value]) => {
            if ( typeof value === 'object' && !Array.isArray( value))
                  value.name = key;
            
            result[key] = pageData( value as defContentRecord);
      })
      // if ( context.nav)
      //       result.nav = new Nav({ nav: context.nav});


      
      return result;
}
