export const defEventList = {
    OnClick: 'click',
    OnBlur: 'blur',
    OnSubmit: 'submit',
} as const;

export type ContextHeader = Record<string, string>;  
export type ChatEntry = Record<string, string|number>;

export type ContextChat = Array<{
    id?:     string,
    title:  string,
    date:   string,
    message: string,
    unread: number,
}>;

export type BlockEntry = {
    template: string; 
    validate?: boolean;
    context: defContentRecord;
};

type ValueType = string | number | boolean | defContent | Record<string, string> | string[][] |undefined | defContentRecord[];
type ExcludeProtoKeys = Exclude<string, 'proto'>;


export type defProto = 'Button' | 'Link' | 'Paragraph' | 'Heading' | 'Nav' | 'Header' | 'Form' | 'Nav' | 'Chat' |
                        'ChatFrame' | 'ChatBar' | 'ChatBarTitle' | 'ChatBarSearch' | 'ChatBarList' | 'ChatBarListItem' |
                        'ChatContent' | 'ChatContentItems' | 'ChatContentHeader' | 'ChatContentHeader' |'Input' | 'Input_F' | 'Div' | 'Img';

export type defChatData = { [key: string]: string | number | defContent | defContentRecord}[];
export interface defContent {
  proto?: defProto;          
  attrs?: Record<string, string>;         
  data?: defContentRecord[];  
  [key: ExcludeProtoKeys]: ValueType; 
 }

 
export type defContentRecord = Record<string, defContent|defContentRecord[]|string|string[][]>;

import {EventBus} from './event_bus';

declare global {
    interface Window {
      eventBus: EventBus;
    }
}
