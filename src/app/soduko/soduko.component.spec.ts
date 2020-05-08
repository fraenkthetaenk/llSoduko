import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SodukoComponent } from './soduko.component';

describe('SodukoComponent', () => {
  let component: SodukoComponent;
  let fixture: ComponentFixture<SodukoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SodukoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SodukoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
