import { Input, ViewChild } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface ObservableDecoratorConfig {
  allowNulls?: boolean;
}

function decorateObservable<T>(attrName: string, config: ObservableDecoratorConfig, decorator = Input) {
  return (target: T, propName: string) => {
    const hiddenPropName = "0_" + propName;
    Object.defineProperty(target, hiddenPropName, {
      set: function (value) {
        if ((config && config.allowNulls) || value !== null) {
          this[propName].next(value);
        }
      }
    });
    const propDecorator = decorator(attrName || propName);
    return propDecorator(target, hiddenPropName);
  };
}

export function InputObs<T>(attrName: string = undefined,
  config: ObservableDecoratorConfig = {}) {
  return decorateObservable(attrName, config, Input);
}
  
export function ViewChildObs<T>(attrName: string = undefined,
  config: ObservableDecoratorConfig = {}) {
  return decorateObservable(attrName, config, ViewChild);
}


function initialCap(name: string): string {
  return name.substring(0, 1).toUpperCase() + name.substring(1);
}

function makeNgName(name: string): string {
  return "ng" + initialCap(name);
}

type cyclename = 'afterContentChecked' | 'afterContentInit' | 'afterViewChecked' | 'afterViewInit' | 'onDestroy' | 'onInit';
  
export function Lifecycle(attrName?: cyclename): any {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const subj = new ReplaySubject<void>(1);
    target[propertyKey] = subj;
    target[makeNgName(attrName || propertyKey)] = () => {
      subj.next();
      subj.complete();
    }
  };
}

