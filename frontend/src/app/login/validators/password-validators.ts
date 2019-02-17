import { FormControl, FormGroup } from "@angular/forms";
export class PasswordValidator {
  static cannotContainSpace(formControl: FormControl) {
    if (formControl.value.indexOf(" ") >= 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }
  static mustMatchGroup(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatchGroup) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatchGroup: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
  static loginError(emailControlName: string, passwordControlName: string) {
    return (formGroup: FormGroup) => {
      const email = formGroup.controls[emailControlName];
      const password = formGroup.controls[passwordControlName];
    };
  }
}
