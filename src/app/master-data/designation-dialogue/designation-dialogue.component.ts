import { FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';
import { DesignationValue } from 'src/app/shared/models/designation-value.model';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

function OrderCheckValidator(isExistingOrder: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
  return isExistingOrder ? { orderExists: { isExistingOrder } } : null;
  };
}

@Component({
  selector: 'app-designation-dialogue',
  templateUrl: './designation-dialogue.component.html',
  styleUrls: ['./designation-dialogue.component.scss']
})
export class DesignationDialogueComponent implements OnInit {
  DesignationForm: FormGroup;
  designationValue: DesignationValue;
  orderlist: DesignationValue[];

  constructor(public config: DynamicDialogConfig,
              private formBuilder: FormBuilder,
              private ref: DynamicDialogRef) { }

  ngOnInit() {
    this.designationValue = this.config.data.currentDesignationData;
    this.orderlist = this.config.data.designationdata;
    // create form group
    this.DesignationForm = this.formBuilder.group({
      Designation: [{ value: this.designationValue.Designation, disabled: false}, Validators.required],
      Order: [{ value: this.designationValue.Order, disabled: false}, Validators.required],
    });

    this.DesignationForm.get('Order').valueChanges
    .pipe(debounceTime(500), distinctUntilChanged())
    .subscribe(value => this.checkOrderValue(value));
  }

  checkOrderValue(order: number) {
    const orderControl = this.DesignationForm.get('Order');
    if (this.orderlist.some(x => x.Order === order)) {
      orderControl.setValidators([Validators.required, OrderCheckValidator(true)]);
    } else {
      orderControl.setValidators([Validators.required, OrderCheckValidator(false)]);
    }
    orderControl.updateValueAndValidity();
  }

  handleSubmitClick() {
    if (this.DesignationForm.dirty && this.DesignationForm.valid) {
      const data = this.DesignationForm.getRawValue();
      // get order for this form // data.order;
      // get all designation data i.i desigationType from parent compo
      // check in existing designation array i.e designationType using some
      // alldesignationData.some(x => x.Order === data.Order), if true then show error message
      if (this.orderlist.some(x => x.Order === data.Order)) {

      }
      this.ref.close(data);
    }
  }

  handleCloseClick() {
    this.ref.close();
  }
}
