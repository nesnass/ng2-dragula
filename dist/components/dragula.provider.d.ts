import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class DragulaService {
    cancel: BehaviorSubject<any>;
    cloned: BehaviorSubject<any>;
    drag: BehaviorSubject<any>;
    dragend: BehaviorSubject<any>;
    drop: BehaviorSubject<any>;
    out: BehaviorSubject<any>;
    over: BehaviorSubject<any>;
    remove: BehaviorSubject<any>;
    shadow: BehaviorSubject<any>;
    dropModel: BehaviorSubject<any>;
    removeModel: BehaviorSubject<any>;
    private events;
    private bags;
    add(name: string, drake: any): any;
    find(name: string): any;
    destroy(name: string): void;
    setOptions(name: string, options: any): void;
    private handleModels(name, drake);
    private setupEvents(bag);
    private domIndexOf(child, parent);
}
