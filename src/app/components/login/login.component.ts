import {Component} from '@angular/core'
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {User} from "../../interfaces/user";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    NgIf
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  login: string = "";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private userService: UserService
  ) {
  }
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  })

  submitDetails() {
    const postData = { ...this.loginForm.value};
    this.userService.user = <string> this.loginForm.controls["email"].value;
    console.log(postData as User);
    this.authService.loginUser(postData as User).subscribe(
      response => {
        console.log(response);
        if(response.toString() == "true") {
          this.router.navigate(['main'])
        } else {alert("No such user")}
      }
    )
  }

  get email() {
    return this.loginForm.controls["email"]
  }

  get password() {
    return this.loginForm.controls["password"]
  }
}
