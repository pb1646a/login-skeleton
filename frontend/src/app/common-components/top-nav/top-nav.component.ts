import { ActivatedRoute } from "@angular/router";
import { Component, OnInit} from "@angular/core";
import { LoginService } from "../../login/services/login/login.service";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";


@Component({
  selector: "app-top-nav",
  templateUrl: "./top-nav.component.html",
  styleUrls: ["./top-nav.component.css"]
})
export class TopNavComponent implements OnInit {
  constructor(
    private _loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  returnUrl;
  isLoggedIn;
  $isLoggedIn: Subscription;


  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
    this._loginService.checkStatus();
    this.$isLoggedIn = this._loginService
      .returnLoginObservable()
      .subscribe(status => {
        if (status) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      });



  }

  onLogout() {
    this.isLoggedIn = this._loginService.removeToken();
    this.router.navigateByUrl('/');
  }
}
