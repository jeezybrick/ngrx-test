import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyPropertyFormComponent } from './modify-property-form.component';

describe('ModifyPropertyFormComponent', () => {
  let component: ModifyPropertyFormComponent;
  let fixture: ComponentFixture<ModifyPropertyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifyPropertyFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPropertyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
