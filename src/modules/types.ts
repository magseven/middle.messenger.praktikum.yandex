export const defEventList = {
    OnClick: 'click',
    OnBlur: 'blur',
    OnSubmit: 'submit',
    OnFocusout: 'focusout'
} as const;

export type ContextHeader = Record<string, string>;  
export type ChatEntry = Record<string, string|number>;

export type ContextChat = Array<{
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

type ValueType = string | number | boolean | defContent | Record<string, string> | string[][] |undefined | defChatData | defContent;
type ExcludeProtoKeys = Exclude<string, 'proto'>;


export type defProto = 'Button' | 'Link' | 'Paragraph' | 'Heading' | 'Nav' | 'Header' | 'Form' | 'Nav' | 'Chat' |
                        'ChatFrame' | 'ChatBar' | 'ChatBarTitle' | 'ChatBarSearch' | 'ChatBarList' | 'ChatContent' | 'Input' | 'Input_F';

export type defChatData = { [key: string]: string | number }[];
export interface defContent {
  proto?: defProto;          
  attrs?: Record<string, string>;                  
  [key: ExcludeProtoKeys]: ValueType; 
 }

 
export type defContentRecord = Record<string, defContent|string|string[][]>;

