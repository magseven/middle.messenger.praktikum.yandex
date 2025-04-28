export type ContextHeader = Record<string, string>;

// type FormField = {
//     proto: 'Input' | 'Button' | 'Avatar';
//     type?: string;
//     placeholder?: string;
//     attrs?: Record<string, string>;
//     text?: string;
//     label?: string;
//     name?: string;
//   };
  
//   // Тип для формы
//   type ContextForm = {
//     [fieldName: string]: FormField;
//   };
  
export type ChatEntry = Record<string, string|number>;

export type ContextChat = Array<{
    title:  string,
    date:   string,
    message: string,
    unread: number,
}>;

// export interface BlockContext {
//     page_title: string,
//     form_name?: string,
//     header?: ContextHeader,
//     form?: ContextForm,
//     chats?: ContextChat,
//     nav?: string[][],
// //    hr?: Record<string, string>,
//     text?: Record<string, string>,
//     [key: string]: def_context_element;*/
//   };

//   export type def_proto = 'Link' | 'Paragraph' | 'HR';

//   export interface def_context_element {
//     proto?: def_proto;            
// //    attrs?: def_attrs;           
//     [key: Exclude<string,'proto'|'attrs'|undefined>]: string /*def_attrs | def_proto | undefined*/; 
//   }
  
//   type T = {
//     [key:string]: def_context_element | string;
//   } 

export type BlockEntry = {
    template: string; 
    validate?: boolean;
    // context: BlockContext;
    context: defContentRecord;
};

type ValueType = string | number | boolean | defContent | Record<string, string> | undefined;
type ExcludeProtoKeys = Exclude<string, 'proto'>;

export type defProto = 'Button' | 'Link' | 'Paragraph' | 'Heading' | 'Nav' | 'Header' | 'Form';
export interface defContent {
  proto?: defProto;          
  attrs?: Record<string, string>;                  
  [key: ExcludeProtoKeys]: ValueType; 
 }

export type defForm = Record<string, defContent>;
export type defContentRecord = Record<string, defContent|string|string[][]>;

