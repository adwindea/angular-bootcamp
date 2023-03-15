import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NumberOnlyValidator } from 'src/shared/number-only.directive';


@Component({
  selector: 'app-checkout-form',
  templateUrl: './checkout-form.component.html',
  styleUrls: ['./checkout-form.component.css']
})
export class CheckoutFormComponent {

  @Output() checkoutEvent = new EventEmitter<{}>();

  checkoutForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.compose([
      Validators.required,
      Validators.email
    ])),
    phone: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10),
      NumberOnlyValidator(),
    ])),
    address: new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(10)
    ]))
  })

  validationMessages = {
    name: {
      required: 'Name is required.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email is not valid.',
    },
    phone: {
      required: 'Phone Number is required.',
      minlength: 'Phone Number minimum length is 10.',
      forbiddenName: 'Phone Number only contain numbers'
    },
    address: {
      required: 'Address is required.',
      minlength: 'Address minimum length is 10.'
    }
  }

  formErrors = {
    name: '',
    email: '',
    phone: '',
    address: '',
  }

  ngOnInit() {
    this.checkoutForm.valueChanges.subscribe((data) => {
      this.logValidationErrors(this.checkoutForm);
    });
  }

  logValidationErrors(group: FormGroup): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = '';
      if(abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)){
        const messages = this.validationMessages[key];
        for(const errorKey in abstractControl.errors){
          if(errorKey){
            this.formErrors[key] += messages[errorKey] + ' ';
          }
        }
      }
      if(abstractControl instanceof FormGroup){
        this.logValidationErrors(abstractControl);
      }
    })
  }

  onSubmit() {
    if (!this.checkoutForm.valid) {
      this.checkoutForm.markAllAsTouched()
      this.logValidationErrors(this.checkoutForm)
    } else {
      this.checkoutEvent.emit(this.checkoutForm.value);
    }
  }

}
