import { Subject } from 'rxjs/Subject';
export declare class DragulaService {
    cancel: Subject<any>;
    cloned: Subject<any>;
    drag: Subject<any>;
    dragend: Subject<any>;
    drop: Subject<any>;
    out: Subject<any>;
    over: Subject<any>;
    remove: Subject<any>;
    shadow: Subject<any>;
    dropModel: Subject<any>;
    removeModel: Subject<any>;
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
