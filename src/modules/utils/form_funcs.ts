import { BlockContext } from '../types';
import { Children } from '../block';
import Header from '../../components/header/header';
import Form from '../../components/form/form';
import Input from '../../components/input/input';
import Button from '../../components/button/Button';
import Avatar from '../../components/avatar/avatar';

type BlockClass = typeof Input | typeof Button | typeof Avatar;
const classRegistry: Record<string, BlockClass> = {
      Input,
      Button,
      Avatar,
};
  
export const pageData = ( context: BlockContext) => {
      let result: Children = {};

      if ( context.header)
            result.header = new Header({ ...context.header});

      if ( context.form) {
            result.form = new Form( Object.entries( context.form).map(([key,value])=>({
                  key, value: new classRegistry[value.proto](value)                   
            })).reduce(( acc, item) => ({...acc, [item.key]: item.value})))
      }
      return result;
}
