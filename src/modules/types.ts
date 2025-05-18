export const defEventList = {
    OnClick: 'click',
    OnBlur: 'blur',
    OnSubmit: 'submit',
    OnLoad: 'load',
    OnContentLoaded: 'DOMContentLoaded'
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
    name?: string; 
};

type ValueType = string | number | boolean | defContent | Record<string, string> | string[][] |undefined | defContentRecord[] | Events;
type ExcludeProtoKeys = Exclude<string, 'proto'>;


export type defProto = 'Button' | 'Link' | 'Paragraph' | 'Heading' | 'Nav' | 'Header' | 'Form' | 'Nav' | 'Chat' |
                        'ChatFrame' | 'ChatBar' | 'ChatBarTitle' | 'ChatBarSearch' | 'ChatBarList' | 'ChatBarListItem' |
                        'ChatContent' | 'ChatContentItems' | 'ChatContentHeader' | 'ChatContentHeader' |'Input' | 'Input_F' | 'Div' | 'Img';

type Events = {
   [eventName: string]: (e: Event) => void;
};

export type defChatData = { [key: string]: string | number | defContent | defContentRecord}[];
export interface defContent {
  proto?: defProto;          
  attrs?: Record<string, string>;   
  events?: Events;       
  data?: defContentRecord[];  
  [key: ExcludeProtoKeys]: ValueType; 
 }

 
export type defContentRecord = Record<string, defContent|defContentRecord[]|string|string[][]|Events>;

import {EventBus} from './event_bus';

declare global {
    interface Window {
      eventBus: EventBus;
    }
}

export enum stdEvents {
    updateProfile = 'updateProfile',
    pageLoaded = 'pageLoaded',
    logout = 'Logout',
}
