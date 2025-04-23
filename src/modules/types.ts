export type ContextHeader = Record<string, string>;
export type ContextForm = Record<string, Record<string, string>>;

export type BlockContext = {
    header: ContextHeader,
    form: ContextForm,
    // [key: string]: string;
};


export type BlockEntry = {
    template: string; 
    validate?: boolean;
    context: BlockContext;
};

