import {Component} from '@angular/core';
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatLabel} from "@angular/material/form-field";
import {MatError} from "@angular/material/form-field";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatFabButton} from "@angular/material/button";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-customer-register',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatError,
    ReactiveFormsModule,
    MatButton,
    RouterLink,
    MatFabButton
  ],
  templateUrl: './customer-register.component.html',
  styleUrl: './customer-register.component.css'
})
export class CustomerRegisterComponent {
  registerCustomerForm!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.registerCustomerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    });
  }

  registerCustomer() {
    if (this.registerCustomerForm.valid) {
      const formData = new FormData();

      formData.append("firstName", this.registerCustomerForm.get("firstName")!.value);
      formData.append("lastName", this.registerCustomerForm.get("lastName")!.value);
      formData.append("email", this.registerCustomerForm.get("email")!.value);
      formData.append("password", this.registerCustomerForm.get("password")!.value);

      this.authService.registerCustomer(formData).subscribe(res => {
        const snackBarDismissed = this.snackBar.open("Customer registered successfully!", 'Close',
          {duration: 1500, panelClass: ['success-snackbar']}).afterDismissed();
        snackBarDismissed.subscribe(() => {
          this.router.navigateByUrl("/customer/login");
        })
      }, err => {
        this.snackBar.open("Error happened!", 'Close',
          {duration: 3000, panelClass: ['error-snackbar']});
      });
    }
  }

}
