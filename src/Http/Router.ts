import {_} from "./Kernel";


export function get(path: string) {
    return (target: any, name: string, value: PropertyDescriptor) => {
        _.get(path, target[name]);
    }
}

export function post(path: string) {
    return (target: any, name: string, value: PropertyDescriptor) => {
        _.post(path, target[name]);
    }
}


export function router(config: { path: string, method: string }) {
    return (target: any, name: string, value: PropertyDescriptor) => {
        (_ as any)[config.method](config.path, target[name]);
    }
}

export function prefix(prefix: string) {
    return (target: any) => {
        target.prototype.prefix = prefix;
    }
}