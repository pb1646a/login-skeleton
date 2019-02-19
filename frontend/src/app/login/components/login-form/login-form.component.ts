import { FormsService } from './../../../components/forms/forms.service.';
import { LoginService } from "./../../services/login/login.service";
import { PasswordValidator } from "../../validators/password-validators";
import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: "app-login-form",
  templateUrl: "./login-form.component.html",
  styleUrls: ["./login-form.component.css"]
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  isLoggedIn;
  loginStatus = { token: "", expiresAt: "" };
  $loginStatus: Subscription;
  returnUrl: string;
  formFields = [
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
  get loginForm(): FormGroup {
    return this.loginFormService.form;
  }
  get fc() {
    return this.loginFormService.form.controls;
  }


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.loginStatus.token = this.loginService.getToken("token");
    this.loginStatus.expiresAt = this.loginService.getToken("expiresAt");
    this.isLoggedIn = this.loginService.checkAuth(this.loginStatus);
    if (this.isLoggedIn) {
      this.router.navigateByUrl(this.returnUrl);
    }

  this.loginFormService.setFields(this.formFields);
  }

  onLogin(userAuth) {
    this.loginService.login(userAuth);
    this.loginService.returnLoginObservable().subscribe(token => {
      if (token) {
        this.router.navigateByUrl(this.returnUrl);
      } else {
        this.loginFormService.form.get("email").setErrors({ invalidEmail: true });
      }
    });
  }
}
