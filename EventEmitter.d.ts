export declare type Listener = (...args: any) => void;
export default class EventEmitter {
    private _events;
    constructor();
    emit(event: string, ...args: any): void;
    on(event: string, callback: Listener): () => Listener[];
    allOff(): void;
}
