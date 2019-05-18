import { FormsService } from './../../../common-components/forms/forms.service.';
import { LoginService } from "./../../services/login/login.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { FormFields } from 'src/app/common-components/forms/models/forms.model';
import { LoginStatus } from '../../models/login.models';

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn;
  loginStatus:LoginStatus = { token: "", expiresAt: "" };
  $loginStatus: Subscription;
  returnUrl: string;
  formFields: FormFields[] = [
    { key: "email", value: "", validators: [Validators.required] },
    { key: "password", value: "", validators: [Validators.required] }
  ];

  constructor(
    public fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute,
    private loginFormService: FormsService
  ) {}

  get fc() {
    return this.loginForm.controls;
  }
  getForm(formName){
    return this.loginFormService.createForm(formName);
  }


  ngOnInit() {
    this.loginForm = this.getForm('loginForm');
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.loginStatus.token = this.loginService.getToken("token");
    this.loginStatus.expiresAt = this.loginService.getToken("expiresAt");
    this.isLoggedIn = this.loginService.checkAuth(this.loginStatus);
    if (this.isLoggedIn) {
      this.router.navigateByUrl(this.returnUrl);
    }

  this.loginFormService.setFields(this.formFields, this.loginForm);
  }

  onLogin(userAuth) {
    this.loginService.login(userAuth);
    this.loginService.returnLoginObservable().subscribe(token => {
      if (token) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.loginForm.get("email").setErrors({ invalidEmail: true });
      }
    });
  }
}
