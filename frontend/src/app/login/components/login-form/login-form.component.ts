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
  loginStatus={token:'', expiresAt:''};
  $loginStatus: Subscription;
  returnUrl: string;
  get fc() {
    return this.form.controls;
  }

  constructor(
    public fb: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this.loginStatus.token = this.loginService.getToken('token');
    this.loginStatus.expiresAt = this.loginService.getToken('expiresAt');
    this.isLoggedIn = this.loginService.checkAuth(this.loginStatus);
    if(this.isLoggedIn){
      this.router.navigateByUrl(this.returnUrl);

    }

    this.form = this.fb.group({
      email: ["", Validators.required],
      password: [
        "",
        Validators.compose([
          Validators.required,
          PasswordValidator.cannotContainSpace
        ])
      ]
    });
  }

  onLogin(userAuth) {
    this.loginService.login(userAuth);
    this.loginService.returnLoginObservable().subscribe(token => {
      if (token) {
        if (this.loginService.checkAuth(token)) {
          this.router.navigateByUrl(this.returnUrl);
        }
      }
    });
  }
}
