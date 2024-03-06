import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {passwordMatchValidator} from "../../shared/password-match.directive";
import {AuthService} from "../../services/auth.service";
import {User} from "../../interfaces/user";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  registerForm = this.fb.group({
    login: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: passwordMatchValidator
  })

  submitDetails() {
    const postData = { ...this.registerForm.value};
    delete postData.confirmPassword;
    this.authService.registerUser(postData as User).subscribe(
      response => {
        console.log(response);
        if(response.toString() == "true"){
        this.router.navigate(['login']);}
      }
    )
  }
  get login() {
    return this.registerForm.controls['login']
  }

  get email(){
    return this.registerForm.controls['email']
  }

  get password() {
    return this.registerForm.controls['password']
  }

  get confirmPassword() {
    return this.registerForm.controls['confirmPassword']
  }
}
