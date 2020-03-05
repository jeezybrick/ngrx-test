import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Store, MemoizedSelector } from '@ngrx/store';

import { AddPropertyDialogComponent } from '@app/property/components/add-property-dialog/add-property-dialog.component';
import { ModifyPropertyState } from '@app/property/reducers/modify-property.reducer';
import { getIsPropertyModifyProcess, getIsPropertyModified } from '@app/reducers';


describe('AddPropertyDialogComponent', () => {
  let component: AddPropertyDialogComponent;
  let fixture: ComponentFixture<AddPropertyDialogComponent>;
  let mockStore: MockStore<ModifyPropertyState>;
  let mockIsPropertyModifySelector: MemoizedSelector<ModifyPropertyState, boolean>;
  let mockIsPropertyModifiedSelector: MemoizedSelector<ModifyPropertyState, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        MatDialogModule,
        MatIconModule
      ],
      providers: [
        provideMockStore(),
        {
          provide: MatDialogRef,
          useValue: {
            close: (dialogResult: any) => {
            }
          }
        }
      ],
      declarations: [AddPropertyDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPropertyDialogComponent);
    component = fixture.componentInstance;

    mockStore = TestBed.get(Store);
    mockIsPropertyModifySelector = mockStore.overrideSelector(getIsPropertyModifyProcess, false);
    mockIsPropertyModifiedSelector = mockStore.overrideSelector(getIsPropertyModified, false);
  });

  it('close button should be enabled if form is not submitting', () => {
    const hostElement = fixture.nativeElement;
    const closeButtonElement: HTMLInputElement = hostElement.querySelector('button');

    mockIsPropertyModifySelector.setResult(false);
    mockStore.refreshState();
    fixture.detectChanges();

    expect(closeButtonElement.disabled).toBe(false);

  });

  it('close button should be disabled if form is submitting', () => {
    const hostElement = fixture.nativeElement;
    const closeButtonElement: HTMLInputElement = hostElement.querySelector('button');

    mockIsPropertyModifySelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();

    expect(closeButtonElement.disabled).toBe(true);

  });

});
