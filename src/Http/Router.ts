import app,{_} from "./Kernel";

console.log(app);

export function prefix(prefix: string) {
    return (target: any, name: string, value: PropertyDescriptor) => {
        console.log(target);
        console.log(name);
        console.log(value);
        target.prototype.prefix = prefix;
    }
}

export function get(path: string) {
    return (target: any, name: string, value: PropertyDescriptor) => {
        console.log(target);
        console.log(target.prototype);
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

