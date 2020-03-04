import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ModifyProperty } from '@app/property/interfaces/modify-property.interface';

@Component({
  selector: 'app-modify-property-form',
  templateUrl: './modify-property-form.component.html',
  styleUrls: ['./modify-property-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModifyPropertyFormComponent implements OnInit {
  public modifyPropertyForm: FormGroup;
  public readonly messageTextareaRows: number = 15;
  public readonly maxLength = {
    title: 50,
    description: 500
  };

  @Input() title: string;
  @Input() description: string;
  @Input() isFormSubmitting: boolean = false;
  @Output() messageFormSubmitted: EventEmitter<ModifyProperty> = new EventEmitter<ModifyProperty>();

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initModifyDiscussionForm();
  }

  get formControls() {
    return this.modifyPropertyForm.controls;
  }

  public onFormSubmit(): void {

    if (!this.modifyPropertyForm.valid) {
      return;
    }

    const {title, description} = this.modifyPropertyForm.value;
    this.messageFormSubmitted.emit({
      title,
      description
    });
  }

  private initModifyDiscussionForm(): void {
    this.modifyPropertyForm = this.formBuilder.group({
      title: [
        this.title,
        [Validators.required, Validators.maxLength(this.maxLength.title)]
      ],
      description: [
        this.description,
        [Validators.required, Validators.maxLength(this.maxLength.description)]
      ]
    });
  }

}
