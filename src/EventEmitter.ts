/* eslint-disable @typescript-eslint/no-explicit-any */

export type Listener = (...args: any) => void;
export default class EventEmitter {
    private _events: { [event: string]: Listener[] };

    constructor() {
        this._events = {};
    }

    emit(event: string, data?: any) {
        for (const fn of this._events[event] || []) {
            fn(data);
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