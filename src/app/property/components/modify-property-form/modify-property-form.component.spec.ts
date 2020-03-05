import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { ModifyPropertyFormComponent } from '@app/property/components/modify-property-form/modify-property-form.component';
import { SharedModule } from '@shared/shared.module';
import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';


describe('ModifyPropertyFormComponent', () => {
  let component: ModifyPropertyFormComponent;
  let fixture: ComponentFixture<ModifyPropertyFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule,
        SharedModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressBarModule],
      declarations: [ModifyPropertyFormComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyPropertyFormComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid initially', () => {
    component.ngOnInit();
    expect(component.modifyPropertyForm.valid).toBe(false);
  });

  it('form should be invalid with empty title and description', () => {
    const mockData: ModifyProperty = {
      title: '',
      description: ''
    };
    component.title = mockData.title;
    component.description = mockData.description;
    component.ngOnInit();

    expect(component.modifyPropertyForm.valid).toBe(false);
  });

  it('form should be invalid with empty title', () => {
    const mockData: ModifyProperty = {
      title: '',
      description: 'description'
    };
    component.title = mockData.title;
    component.description = mockData.description;

    component.ngOnInit();

    expect(component.modifyPropertyForm.valid).toBe(false);
  });

  it('form should be invalid with empty description', () => {
    const mockData: ModifyProperty = {
      title: 'title',
      description: ''
    };
    component.title = mockData.title;
    component.description = mockData.description;
    component.ngOnInit();

    expect(component.modifyPropertyForm.valid).toBe(false);
  });

  it('form should be invalid with over-maxlength title', () => {
    const maxLength = component.maxLength.title;
    const mockData: ModifyProperty = {
      title: new Array(maxLength + 2).join( 't' ),
      description: 'description'
    };
    component.title = mockData.title;
    component.description = mockData.description;

    component.ngOnInit();

    expect(component.modifyPropertyForm.valid).toBe(false);
  });

  it('form should be invalid with over-maxlength description', () => {
    const maxLength = component.maxLength.description;
    const mockData: ModifyProperty = {
      title: 'title',
      description: new Array(maxLength + 2).join( 't' )
    };
    component.title = mockData.title;
    component.description = mockData.description;

    component.ngOnInit();
    fixture.detectChanges();

    expect(component.modifyPropertyForm.valid).toBe(false);
  });

  it('form should be valid with valid fields', () => {
    const mockData: ModifyProperty = {
      title: 'title',
      description: 'description'
    };
    component.title = mockData.title;
    component.description = mockData.description;
    component.ngOnInit();

    expect(component.modifyPropertyForm.valid).toBe(true);
  });

  it('isFormSubmitting variable should be true after form submitted', () => {
    const mockData: ModifyProperty = {
      title: 'title',
      description: 'description'
    };

    component.title = mockData.title;
    component.description = mockData.description;
    component.ngOnInit();
    component.messageFormSubmitted.subscribe((res: ModifyProperty) => {
      expect(component.modifyPropertyForm.valid).toBe(true);
    });

    component.onFormSubmit();

  });

  it('event should be triggered if form is valid', () => {
    const mockData: ModifyProperty = {
      title: 'title',
      description: 'description'
    };

    component.title = mockData.title;
    component.description = mockData.description;
    component.ngOnInit();
    component.messageFormSubmitted.subscribe((res: ModifyProperty) => {
      const {title, description} = res;

      expect(title).toBe(mockData.title);
      expect(description).toBe(mockData.description);

    });

    component.onFormSubmit();

  });

  it('should not have form instance after construction', () => {
    expect(component.modifyPropertyForm).toBeUndefined();
  });


  it('should have form instance after Angular calls ngOnInit', () => {
    component.ngOnInit();
    expect(component.modifyPropertyForm).toBeDefined();
  });

  it('submit button should be disabled with invalid form', () => {
    const hostElement = fixture.nativeElement;

    fixture.detectChanges();

    const submitButtonElement: HTMLInputElement = hostElement.querySelector('button');
    const titleInput: HTMLInputElement = hostElement.querySelector('input');
    const descriptionTextarea: HTMLInputElement = hostElement.querySelector('textarea');

    titleInput.value = '';
    descriptionTextarea.value = '';

    titleInput.dispatchEvent(new Event('input'));
    descriptionTextarea.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(submitButtonElement.disabled).toBe(true);

  });

  it('submit button should be enabled with valid form', () => {
    const hostElement = fixture.nativeElement;

    fixture.detectChanges();

    const submitButtonElement: HTMLInputElement = hostElement.querySelector('button');
    const titleInput: HTMLInputElement = hostElement.querySelector('input');
    const descriptionTextarea: HTMLInputElement = hostElement.querySelector('textarea');

    titleInput.value = 'title';
    descriptionTextarea.value = 'description';

    titleInput.dispatchEvent(new Event('input'));
    descriptionTextarea.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(submitButtonElement.disabled).toBe(false);

  });


});
