import { ReplaySubject } from 'rxjs/ReplaySubject';
export declare class DragulaService {
    cancel: ReplaySubject<any>;
    cloned: ReplaySubject<any>;
    drag: ReplaySubject<any>;
    dragend: ReplaySubject<any>;
    drop: ReplaySubject<any>;
    out: ReplaySubject<any>;
    over: ReplaySubject<any>;
    remove: ReplaySubject<any>;
    shadow: ReplaySubject<any>;
    dropModel: ReplaySubject<any>;
    removeModel: ReplaySubject<any>;
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
