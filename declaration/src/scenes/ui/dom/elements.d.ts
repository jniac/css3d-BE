export declare const uiElement: Element;
declare type DivProps = {
    updateValue: (value: any) => void;
};
export declare const divProps: Map<HTMLDivElement, DivProps>;
export declare const createDiv: (id: string, className: string, innerHTML: string) => HTMLDivElement;
export declare const createGroup: (id: string) => HTMLDivElement;
export declare const group: (id: string, callback: () => void) => void;
export {};
