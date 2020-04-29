
export type Listener = (...args: any) => void;
export default class EventEmitter {
    private _events: { [event: string]: Listener[] };

    constructor() {
        this._events = {};
    }

    emit(event: string, ...args: any) {
        for (const fn of this._events[event] || []) {
            fn(...args);
        }
    }

    on(event: string, callback: Listener) {
        (this._events[event] = this._events[event] || []).push(callback);

        return () => (
            this._events[event] = this._events[event].filter(fn => fn !== callback)
        );
    }

    allOff() {
        this._events = {};
    }
}