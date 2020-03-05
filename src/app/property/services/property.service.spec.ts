import { TestBed } from '@angular/core/testing';

import { PropertyService } from '@app/property/services/property.service';
import { Property } from '@app/property/models/property.model';
import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';

describe('PropertyService', () => {
  let service: PropertyService;
  const mockProperties: Property[] = [
    {
      id: 4,
      title: 'title 4',
      description: 'description 4',
      createdAt: Date.now() + 4
    },
    {
      id: 2,
      title: 'title 2',
      description: 'description 2',
      createdAt: Date.now() + 2
    },
    {
      id: 1,
      title: 'title',
      description: 'description',
      createdAt: Date.now()
    },
    {
      id: 3,
      title: 'title 3',
      description: 'description 3',
      createdAt: Date.now() + 3
    }
  ];



  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyService);

    service.setProperties([...mockProperties]);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getProperties should not return false value',
    (done: DoneFn) => {
      service.getProperties().subscribe((properties: Property[]) => {
        expect(properties).toBeTruthy();
        done();
      });
    });

  it('#getProperties should return array with properties and be sorted by date',
    (done: DoneFn) => {
      const sortedProperties = service.sortByDate([...mockProperties]);
      const unSortedProperties = [...mockProperties];

      service.getProperties().subscribe((properties: Property[]) => {
        expect(properties).toEqual(sortedProperties);
        done();
      });

      service.getProperties().subscribe((properties: Property[]) => {
        expect(properties).not.toEqual(unSortedProperties);
        done();
      });
    });

  it('#addProperty should return added item and list with added item',
    (done: DoneFn) => {
      const addMockData: ModifyProperty = {
        title: 'title',
        description: 'description'
      };

      service.addProperty(addMockData).subscribe((response: Property) => {
        expect(response).toBeTruthy();
        expect(response).toBeInstanceOf(Property);

        service.getProperties().subscribe((properties: Property[]) => {
          const ids: number[] = properties.map((item: Property) => item.id);
          expect(ids).toContain(response.id);
          done();
        });

        done();
      });
    });

  it('#updateProperty should return updated item',
    (done: DoneFn) => {
      const itemForUpdate: Property = {
        ...mockProperties[0],
      } as Property;
      const updatedFields: Partial<ModifyProperty> = {
        title: `${itemForUpdate.title}-suffix`,
        description: `${itemForUpdate.description}-suffix`
      };

      service.updateProperty(itemForUpdate.id, updatedFields).subscribe((updatedProperty: Property) => {
        expect(updatedProperty).toBeTruthy();
        expect(updatedProperty.title).toBe(updatedFields.title);
        expect(updatedProperty.description).toBe(updatedFields.description);
        done();
      });

    });

  it('#removeProperty should return removed item and list without removed item',
    (done: DoneFn) => {
      const itemIdForRemoving: number = mockProperties[0].id;

      service.removeProperty(itemIdForRemoving).subscribe((removedProperty: Property) => {
        expect(removedProperty.id).toBe(itemIdForRemoving);

        service.getProperties().subscribe((properties: Property[]) => {
          const ids: number[] = properties.map((item: Property) => item.id);
          expect(ids).not.toContain(itemIdForRemoving);
          done();
        });

        done();
      });

    });

});
