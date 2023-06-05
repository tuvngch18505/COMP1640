import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ApiService } from '../api.service';
interface LoginDetails {
  email: string | null,
  password: string | null,
}
@Component({

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  status: any;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router) { } //dependency injection
  ngOnInit(): void { }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.minLength(9), Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })
  
  onSubmit(data: any) {

    this.api.login(
      data.email,
      data.password
    ).subscribe(res => {
      // confirm("Đăng nhập thành công");
      
      
      localStorage.setItem('accessToken', res.accessToken);
      console.log(res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      console.log(res.message);
      if (res.status != 200) {
        alert("Email or password is incorrect! Please try again!")
        this.router.navigate(['/login']);
      } else if (res.status == 200){
        // alert("Login Successful!");
        const helper = new JwtHelperService();
        const user = helper.decodeToken(res.accessToken);

        console.log(user);

        if (user.role == 1) {
          this.router.navigateByUrl('/admin').then(() => {
            // Reload the current page
            window.location.reload();
          });
          // this.router.navigate(['/admin'])
        } else if (user.role == 3) {
          this.router.navigateByUrl('/QAM');
        } 
        else if (user.role == 4) {
          this.router.navigateByUrl('/staff');
        }
        

      }



      // luu lai trang trc roi quay lai trang do, sau do xoa di
      // this.router.navigateByUrl('/students');
      // localStorage.setItem('token', res.result);
    },

      error => {
        alert("Email or password is incorrect! Please try again")
        
        this.router.navigate(['/login']);
      }

    );

  }

}
