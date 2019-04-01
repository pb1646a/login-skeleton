import { FormsService } from "./../../common-components/forms/forms.service.";
import { UserManagmentService } from "./../services/user.service";
import { LoginService } from "src/app/login/services/login/login.service";
import { PasswordValidator } from "./../../login/validators/password-validators";
import { ActivatedRoute } from "@angular/router";
import { Router } from "@angular/router";

import { Subscription } from "rxjs";

import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { User } from "src/app/user/models/user.model";

@Component({
  selector: "app-registration-form",
  templateUrl: "./registration-form.component.html",
  styleUrls: ["./registration-form.component.css"]
})
export class RegistrationFormComponent implements OnInit, OnDestroy {
  isLoggedIn;
  loginStatus = { token: "", expiresAt: "" };
  $loginStatus: Subscription;
  returnUrl: string;
  errors;
  currentControl;
  currentUser: User;
  $$currentUser: Subscription;
  $$error: Subscription;
  error;
  registrationForm: FormGroup;
  emailPattern = new RegExp(
    "(^[a-zA-Z0-9]+)([-_.])?[a-zA-Z0-9]+(@{1}(?!$))[a-zA-Z(.)]+.+(?!$)[a-zA-Z]+$"
  );
  formFields = [
    { key: "firstname", value: "", validators: [Validators.required] },
    { key: "lastname", value: "", validators: [Validators.required] },
    {
      key: "email",
      value: "",
      validators: [Validators.required, Validators.pattern(this.emailPattern)]
    },
    {
      key: "password",
      value: "",
      validators: [Validators.required]
    },
    {
      key: "confirmpassword",
      value: "",
      validators: [Validators.required]
    }
  ];

  constructor(
    private formsService: FormsService,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserManagmentService
  ) {}
  getForm(name) {
    return this.formsService.createForm(name);
  }
  get fc() {
    return this.registrationForm.controls;
  }

  ngOnInit() {
    this.registrationForm = this.getForm("registrationForm");
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.loginStatus.token = this.loginService.getToken("token");
    this.loginStatus.expiresAt = this.loginService.getToken("expiresAt");
    this.isLoggedIn = this.loginService.checkAuth(this.loginStatus);
    if (this.isLoggedIn) {
      this.router.navigateByUrl(this.returnUrl);
    }
    this.formsService.setFields(this.formFields, this.registrationForm);
    this.formsService.addFormValidators(
      [PasswordValidator.mustMatchGroup("password", "confirmpassword")],
      this.registrationForm
    );
  }
  onRegister(val) {
    if (!this.registrationForm.valid) {
      const controls = this.registrationForm.controls;
      for (const control in controls) {
        if (control) {
          this.currentControl = this.registrationForm.get(control);
          if (this.currentControl.invalid) {
            this.errors = this.currentControl.errors;
            this.currentControl.setErrors({ required: true });
            this.currentControl.markAsTouched();
          }
        }
      }
      return;
    }
    this.userService.registerUser(val);
    this.$$currentUser = this.userService
      .returnCurrentUserAsObservable()
      .subscribe(user => {
        if (user) {
          this.currentUser = user;

          this.router.navigateByUrl("/login");
        }
        if (!user) {
          this.$$error = this.userService
            .returnErrorAsObservable()
            .subscribe(error => {
              this.error = error;
              if (this.error.status && this.error.status === "404") {
                return this.router.navigate(["PageNotFound"]);
              }
              return error;
            });
        }
      });
  }
  ngOnDestroy() {
    this.registrationForm.reset();
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
