import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { Router } from "@angular/router";

export class HttpErrorInterceptor implements HttpInterceptor {
  router: Router;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((error: HttpErrorResponse) => {
        let err = {
          status: "",
          message: ""
        };
        if (error.error instanceof ErrorEvent) {
          // client-side error
          err.message = `Error: ${error.error.message}`;
        } else {
          // server-side error
          err.status = error.status.toString();
          err.message = error.message;
        }
        if (err.status) {
          if (err.status == "500") {
            window.alert(error.message);
          }
        }
        // window.alert(errorMessage);
        return throwError(err);
      })
    );
  }
}
