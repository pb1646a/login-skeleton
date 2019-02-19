import { FormsService } from "./../../components/forms/forms.service.";

import { FormGroup, Validators, FormControl, FormArray } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.css"]
})
export class RegistrationFormComponent implements OnInit {
  formFields = [
    { key: "firstname", value: "", validators: [Validators.required] },
    { key: "lastname", value: "", validators: [Validators.required] },
    { key: "email", value: "", validators: [Validators.required] },
    { key: "password", value: "", validators: [Validators.required] },
    { key: "confirmpassword", value: "", validators: [Validators.required] }
  ];
  errors;
  currentControl;
  constructor(private registrationForm: FormsService) {}
  get userForm(): FormGroup {
    return this.registrationForm.form;
  }
  get fc() {
    return this.registrationForm.form.controls;
  }

  ngOnInit() {
    this.registrationForm.setFields(this.formFields);
  }
  onRegister(val) {
    if (!this.registrationForm.form.valid) {
      const controls: FormControl = this.registrationForm.form.controls;
      for (const control in controls) {
        if (control) {
          this.currentControl = this.registrationForm.form.get(control);
          if (this.currentControl.invalid) {
            this.errors = this.currentControl.errors;
            this.currentControl.setErrors({ required: true });
            this.currentControl.markAsTouched();
          }
        }
      }
    }
  }
}

/*

  onAddField(){
    this.registration.addDynamicFields(this.formFields);
  }
  onRemoveField(index){
    this.registration.form.get('items').removeAt(index);

  }

  <div *ngIf="fc['items']">
        <div formArrayName="items">
            <div *ngFor= "let item of userForm.get('items')['controls']; let i = index;">
              <div [formGroupName]="i">
                <input type="text" formControlName="firstname">
              </div>
              <button class="btn btn-primary" type="button" (click)="onRemoveField(i);">Remove </button>
            </div>
          </div>

    </div>

    <button class="btn btn-primary" type="button" (click)="onAddField();">Add Field</button>


*/
