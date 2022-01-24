import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CheckEmailDirective } from './check-email.directive';

describe('CheckEmailDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  function compileComponent() {
    TestBed.compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        CheckEmailDirective
      ],
      imports: [
        CommonModule,
        FormsModule,
      ],
      providers: [
        { provider: ComponentFixtureAutoDetect, useValue: true }
      ]
    });
  }));
  
  it('should create an instance', () => {
    const directive = new CheckEmailDirective();
    expect(directive).toBeTruthy();
  });

  it('should be invalid', async(() => {
    compileComponent();
    component.testModel = 'test';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const emailModel = fixture.debugElement.query(By.css('input[name=email]')).references['email'.toString()];
      expect(emailModel.valid).toBe(false);
    });
  }));

  it('should be valid', async(() => {
    compileComponent();
    component.testModel = 'test@test.test';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const emailModel = fixture.debugElement.query(By.css('input[name=email]')).references['email'.toString()];
      expect(emailModel.valid).toBe(true);
    });
  }));
});

@Component({
  selector: 'app-test-email',
  template: '<form #form="ngForm">' +
    '<input name="email" #email="ngModel" [(ngModel)]="testModel" appCheckEmail>' +
    '</form>'
})
class TestComponent {
  testModel: string | undefined;
}
