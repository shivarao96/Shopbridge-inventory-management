import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { OutsideClickDirective } from './outside-click.directive';

class MockElementRef {
  constructor() {
    return {
      nativeElement : [

      ]
    }
  }
}

describe('OutsideClickDirective', () => {

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [OutsideClickDirective],
      providers: [
        {provide: ElementRef, useClass: MockElementRef}
      ]
    }).compileComponents();
  });

  it('should create an instance', () => {
    const directive = new OutsideClickDirective(new MockElementRef() as ElementRef);
    expect(directive).toBeTruthy();
  });
});
