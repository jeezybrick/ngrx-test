import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { PropertyItemComponent } from '@app/property/components/property-list/property-item/property-item.component';
import { Property } from '@app/property/models/property.model';

describe('PropertyItemComponent', () => {
  let component: PropertyItemComponent;
  let fixture: ComponentFixture<PropertyItemComponent>;
  let updateButtonElement: HTMLButtonElement;
  let removeButtonElement: HTMLButtonElement;
  let hostElement: any;

  const mockItem: Property = {
    id: 1,
    title: 'title',
    description: 'description',
    createdAt: Date.now()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatButtonModule
      ],
      declarations: [PropertyItemComponent]
    })
      .overrideComponent(PropertyItemComponent, {
        set: {changeDetection: ChangeDetectionStrategy.Default}
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyItemComponent);
    component = fixture.componentInstance;
    hostElement = fixture.nativeElement;

    component.property = {...mockItem} as Property;
    removeButtonElement = hostElement.querySelector('.remove');
    updateButtonElement = hostElement.querySelector('.update');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#updateButtonClicked should trigger on update button click', () => {
    component.updateButtonClicked.subscribe((res: Property) => {
      expect(res).toEqual(mockItem);
    });

    updateButtonElement.click();

  });

  it('#removeButtonClicked should trigger on remove button click', () => {
    component.removeButtonClicked.subscribe((itemId: number) => {
      expect(itemId).toEqual(mockItem.id);
    });

    removeButtonElement.click();

  });

  it('action buttons should be disabled if isActionButtonsDisabled is true', () => {
    component.isActionButtonsDisabled = true;
    fixture.detectChanges();

    expect(removeButtonElement.disabled).toBeTrue();
    expect(updateButtonElement.disabled).toBeTrue();

  });

  it('action buttons should be enabled if isActionButtonsDisabled is false', () => {
    component.isActionButtonsDisabled = false;
    fixture.detectChanges();

    expect(removeButtonElement.disabled).toBeFalse();
    expect(updateButtonElement.disabled).toBeFalse();

  });

});
