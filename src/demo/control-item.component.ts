import { Component, EventEmitter, Output } from '@angular/core';
import { ReplaySubject, Observer, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { InputObs  } from './decorators';

@Component({
  selector: 'control-item',
  template: `
  <div class="control-item-frame">
    <div class="control-item-name">{{ name | async }}</div>
    <div>{{ formattedValue | async }}</div>
    <button mat-raised-button (click)="change.emit(1)">+</button>
    <button mat-raised-button (click)="change.emit(-1)">-</button>
  </div>
`,
  styles: [
    '.control-item-frame {display: flex; width: 100%; max-width: 300px; margin: 20px; }',
    '.control-item-name { text-align: right; flex-grow: 1;}',
    'div { margin: 0 10px; }',
  ],
})
export class ControlItemComponent {
  @InputObs() readonly name = new ReplaySubject<string>(1);
  @InputObs() readonly value = new ReplaySubject<number | undefined >(1);
  @Output() readonly change = new EventEmitter<number>();

  readonly formattedValue = this.value.pipe(map((v?: number) => (v === undefined)? "?": String(v)));
}

