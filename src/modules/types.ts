export type BlockContext = {
    [key: string]: any;
};
  
export type BlockEntry = {
    template: string; 
    validate?: boolean;
    context: BlockContext;
};
