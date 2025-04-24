export type ContextHeader = Record<string, string>;
export type ContextForm = Record<string, Record<string, string>>;
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

