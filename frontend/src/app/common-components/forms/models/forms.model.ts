import { Validators } from "@angular/forms";

export interface FormFields{
    key: string;
    value: string;
    validators: Validators[]
}