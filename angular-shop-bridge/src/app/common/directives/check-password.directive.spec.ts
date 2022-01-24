import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { async, ComponentFixture, ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { CheckPasswordDirective } from './check-password.directive';

describe('CheckPasswordDirective', () => {
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
        CheckPasswordDirective
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

  it('should be invalid', async(() => {
    compileComponent();
    component.testModel = 'aeio';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const passwordModel = fixture.debugElement.query(By.css('input[name=password]')).references['password'.toString()];
      expect(passwordModel.valid).toBe(false);
    });
  }));

  it('should be valid', async(() => {
    compileComponent();
    component.testModel = 'aeio@1AA';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const passwordModel = fixture.debugElement.query(By.css('input[name=password]')).references['password'.toString()];
      expect(passwordModel.valid).toBe(true);
    });
  }));

  it('should create an instance', () => {
    const directive = new CheckPasswordDirective();
    expect(directive).toBeTruthy();
  });

  it('should be a invalid formControl', () => {
    const directive = new CheckPasswordDirective();
    const testForm = new FormControl('');
    directive.validate(testForm);
    expect(testForm.valid).toBeTruthy();
  });

  it('should be a valid formControl', () => {
    const directive = new CheckPasswordDirective();
    const testForm = new FormControl('aeio@1AA');
    expect(directive.validate(testForm)).toBeNull();
  });
});
@Component({
  selector: 'app-test-password',
  template: '<form #form="ngForm">' +
    '<input name="password" #password="ngModel" [(ngModel)]="testModel" appCheckPassword>' +
    '</form>'
})
class TestComponent {
  testModel: string | undefined;
}
