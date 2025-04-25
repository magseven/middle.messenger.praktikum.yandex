export type ContextHeader = Record<string, string>;

type FormField = {
    proto: 'Input' | 'Button' | 'Avatar';
    type?: string;
    placeholder?: string;
    attrs?: Record<string, string>;
    text?: string;
    label?: string;
  };
  
  // Тип для формы
  type ContextForm = {
    [fieldName: string]: FormField;
  };
  
//export type ContextForm = Record<string, Record<string, string>>;

export type ChatEntry = Record<string, string|number>;

export type ContextChat = Array<{
    title:  string,
    date:   string,
    message: string,
    unread: number,
}>;

export type BlockContext = {
    page_title?: string,
    form_name?: string,
    header?: ContextHeader,
    form?: ContextForm,
    menu?: string[][],
    chats?: ContextChat,
};

export type BlockEntry = {
    template: string; 
    validate?: boolean;
    context: BlockContext;
};

