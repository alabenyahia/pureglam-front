import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {StorageService} from "../../services/storage/storage.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatIcon} from "@angular/material/icon";
import {UserAuthStatusService} from "../../services/user-auth-status/user-auth-status.service";

@Component({
  selector: 'app-customer-login',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    RouterLink,
    MatIcon,
    MatIconButton,
    MatFabButton
  ],
  templateUrl: './customer-login.component.html',
  styleUrl: './customer-login.component.css'
})
export class CustomerLoginComponent {

  loginCustomerForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private userAuthStatusService: UserAuthStatusService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.loginCustomerForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, Validators.required]
    });
  }

  loginCustomer() {
    if (this.loginCustomerForm.valid) {
      this.authService.loginCustomer(this.loginCustomerForm.value).subscribe((res: any) => {
        console.log("res", res)
        if (res.userId != null) {
          const user = {
            id: res.userId,
            role: "ROLE_CUSTOMER",
            isLoggedIn: true
          }

          this.userAuthStatusService.updateCustomerUserLoginStatus(true);
          StorageService.saveCustomerToken(res.jwt);

          this.router.navigateByUrl("/customer/dashboard");
        } else {
          this.snackBar.open("Bad credentials!", 'Close',
            {duration: 3000, panelClass: ['error-snackbar']});
        }
      }, err => {
        console.log(err)
        this.snackBar.open(err.error, 'Close',
          {duration: 3000, panelClass: ['error-snackbar']});
      });
    }
  }

}
