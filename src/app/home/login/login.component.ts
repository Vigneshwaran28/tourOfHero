import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  public username: string = ''; // store the username from the ngModel
  public password: string = ''; // store the password from the ngModel
  public loginError: string = '';  // store the error

  constructor(private router: Router, private mainService: MainService) {}

  
  ngOnInit() {
    // Check if the user is already logged in
  if (this.mainService.isLoggedIn()) {
    const adminStatus = localStorage.getItem('admin');
    console.log('Admin status on login:', adminStatus);  // Log to see the stored value
    this.router.navigate(['home']);  // Redirect to home if already logged in
  }
  }

  //login function
  login() {
    this.mainService.login(this.username, this.password).subscribe(
      (response: any) => {
        console.log('Login successful', response);  // Debugging the response object
        this.mainService.handleLogin(response); 
        // Ensure the token exists in the response before accessing it
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          
          // Check and store the is_admin value if present
          if (response.is_staff !== undefined) {
            localStorage.setItem('admin', response.is_staff.toString());
  
            // Navigate based on staff status
            if (response.is_staff === true) {
              console.log('Admin login');
              this.router.navigate(['home']);
            } else {
              this.router.navigate(['home']).then(() => {
                console.log('Navigation to home successful');
              }).catch((err) => {
                console.error('Navigation to home failed', err);
              });
              console.log('Non-admin login');
                // Navigate to the regular home page
            }
          } else {
            console.error('is_admin is missing in the response');
          }
        } else {
          console.error('Token is missing in the response');
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.loginError = 'Username or password is wrong'
      }
    );
  }

  signUp(){
    this.router.navigate(['register'])
  }
}
