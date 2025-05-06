import { defContentRecord } from '../types';
import { BlockProps, Block } from '../block';
import Nav from '../../components/nav/nav';
import Header from '../../components/header/header';
import Form from '../../components/form/form';
import {Input_F, Input} from '../../components/input/input';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/avatar';
import Heading from '../../components/heading/heading';
import Link from '../../components/link/link';
import Div from '../../components/div/div';
import Paragraph from '../../components/paragraph/paragraph';
import {Chat, ChatFrame, ChatBar, ChatBarTitle, ChatBarSearch, ChatBarList, ChatBarListItem, ChatContent} from '../../components/chat/chat';
//ChatBarListItemContent, ChatBarListItemContentHeader, ChatBarListItemContentMessage

type BlockClass = typeof Div | typeof Input | typeof Input_F | typeof Button | typeof Avatar | typeof Paragraph | typeof Heading | 
                  typeof Link | typeof Nav | typeof Header | typeof Form | typeof Chat | typeof ChatFrame | typeof ChatBar |
                  typeof ChatBarTitle | typeof ChatBarSearch | typeof ChatBarList | typeof ChatBarListItem  | typeof ChatContent;
                  
const classRegistry: Record<string, BlockClass> = {
      Div,
      Input,
      Input_F,
      Button,
      Avatar,
      Heading,
      Paragraph,
      Link, 
      Nav,
      Header,
      Form,
      Chat,
      ChatFrame,
      ChatBar,
      ChatBarTitle,
      ChatBarSearch,
      ChatBarList,
      ChatBarListItem,
      ChatContent,
}; 
  
export const pageData = ( item: defContentRecord): BlockProps | string | Block => {
      let result: BlockProps = {};

      if ( typeof item === 'string')
            return item;

      //console.log('key', item);

      if ( Object.hasOwn( item, 'proto') && ( typeof item.proto === 'string'))
            return new classRegistry[item.proto]( pageData( Object.entries( item).reduce(( acc, it) => ({...acc,...it[0] != 'proto' && {[it[0]]: it[1]}}), {})) as BlockProps);
      
      Object.entries( item).forEach(([key, value]) => {
            if ( typeof value === 'object' && !Array.isArray( value) && key != 'attrs') {
                  value.name = key;
            }
            result[key] = pageData( value as defContentRecord);
            
      })
      return result;
}
