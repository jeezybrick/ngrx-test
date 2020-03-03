import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePropertyDialogComponent } from './update-property-dialog.component';

describe('UpdatePropertyDialogComponent', () => {
  let component: UpdatePropertyDialogComponent;
  let fixture: ComponentFixture<UpdatePropertyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePropertyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePropertyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
