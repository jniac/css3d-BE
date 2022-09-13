export declare const uiElement: Element;
export declare let frame: number;
declare type DivProps = {
    updateValue: (value: any) => void;
};
export declare const divProps: Map<HTMLDivElement, DivProps>;
export declare const getDiv: (id: string, className: string, innerHTML: string) => HTMLDivElement;
export {};
