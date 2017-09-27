import { dragula } from './dragula.class';
import { Injectable, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DragulaService {
  public cancel: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public cloned: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public drag: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public dragend: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public drop: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public out: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public over: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public remove: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public shadow: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public dropModel: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public removeModel: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  private events: string[] = [
    'cancel', 'cloned', 'drag', 'dragend', 'drop', 'out', 'over',
    'remove', 'shadow', 'dropModel', 'removeModel'
  ];
  private bags: any[] = [];

  public add(name: string, drake: any): any {
    let bag = this.find(name);
    if (bag) {
      throw new Error('Bag named: "' + name + '" already exists.');
    }
    bag = {name, drake};
    this.bags.push(bag);
    if (drake.models) { // models to sync with (must have same structure as containers)
      this.handleModels(name, drake);
    }
    if (!bag.initEvents) {
      this.setupEvents(bag);
    }
    return bag;
  }

  public find(name: string): any {
    for (let bag of this.bags) {
      if (bag.name === name) {
        return bag;
      }
    }
  }

  public destroy(name: string): void {
    let bag = this.find(name);
    let i = this.bags.indexOf(bag);
    this.bags.splice(i, 1);
    bag.drake.destroy();
  }

  public setOptions(name: string, options: any): void {
    let bag = this.add(name, dragula(options));
    this.handleModels(name, bag.drake);
  }

  private handleModels(name: string, drake: any): void {
    let dragElm: any;
    let dragIndex: number;
    let dropIndex: number;
    let sourceModel: any;
    drake.on('remove', (el: any, source: any) => {
      if (!drake.models) {
        return;
      }
      sourceModel = drake.models[drake.containers.indexOf(source)];
      sourceModel.splice(dragIndex, 1);
      // console.log('REMOVE');
      // console.log(sourceModel);
      this.removeModel.next([name, el, source]);
    });
    drake.on('drag', (el: any, source: any) => {
      dragElm = el;
      dragIndex = this.domIndexOf(el, source);
    });
    drake.on('drop', (dropElm: any, target: any, source: any) => {
      if (!drake.models || !target) {
        return;
      }
      dropIndex = this.domIndexOf(dropElm, target);
      sourceModel = drake.models[drake.containers.indexOf(source)];
      // console.log('DROP');
      // console.log(sourceModel);
      if (target === source) {
        sourceModel.splice(dropIndex, 0, sourceModel.splice(dragIndex, 1)[0]);
      } else {
        let notCopy = dragElm === dropElm;
        let targetModel = drake.models[drake.containers.indexOf(target)];
        let dropElmModel = notCopy ? sourceModel[dragIndex] : JSON.parse(JSON.stringify(sourceModel[dragIndex]));

        if (notCopy) {
          sourceModel.splice(dragIndex, 1);
        }
        targetModel.splice(dropIndex, 0, dropElmModel);
        target.removeChild(dropElm); // element must be removed for ngFor to apply correctly
      }
      this.dropModel.next([name, dropElm, target, source]);
    });
  }

  private setupEvents(bag: any): void {
    bag.initEvents = true;
    let that: any = this;
    let emitter = (type: any) => {
      function replicate(): void {
        let args = Array.prototype.slice.call(arguments);
        that[type].emit([bag.name].concat(args));
      }

      bag.drake.on(type, replicate);
    };
    this.events.forEach(emitter);
  }

  private domIndexOf(child: any, parent: any): any {
    return Array.prototype.indexOf.call(parent.children, child);
  }
}
