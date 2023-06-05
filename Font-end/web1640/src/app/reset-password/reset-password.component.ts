import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;

  status: any;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog) {

  } //dependency injection



  ngOnInit() {

    this.resetPasswordForm = this.fb.group({
      
      password: ['', [Validators.required, Validators.minLength(6)]],
      
      
      
    });

    // this.newaccount();
    // this.newAccountForm.reset();

  }


   onSubmit() {
    //get password from localstorage

    // if(this.loginForm.invalid){
    //     return false;
    // } 
    // truyen du lieu vao form
    // console.log(data.phone, data.password);
    // this.router.navigateByUrl('/students');

    // return true;
    // console.log(
    //  this.resetPasswordForm.value);
    // if (this.resetPasswordForm.value.oldPassword != oldPw) {

    //   alert("Mật khẩu cũ không đúng");
    //   return false;
    // }
    // else if (this.resetPasswordForm.value.newPassword != this.resetPasswordForm.value.reNewPassword) {
    //   alert("Mật khẩu mới không trùng khớp");
    //   return false;
    // }
    // else {
    // console.log("hii");

    var formData = new FormData();
    formData = this.resetPasswordForm.getRawValue()
    console.log(formData)
    // formData.append('firstname', this.myForm?.get('FirstName')?.value);
    // formData.append('lastname', this.myForm?.get('LastName')?.value);
    // formData.append('username', this.myForm?.get('UserName')?.value);
    // formData.append('email', this.myForm?.get('Email')?.value);
    // formData.append('role', this.myForm?.get('Role')?.value);
    // formData.append('password', this.myForm?.get('Password')?.value);
    // formData.append('department', this.myForm?.get('Department')?.value);

    
    
    this.api.changePassword( formData
    ).subscribe(res => {

      // alert("Login Successful!");
        var data = JSON.parse(res)

        console.log(res);
        console.log(data.data.username);

        if (data.status == 200) {

          alert("Change Password Successful!");
         
          this.router.navigate(['/admin'])
        
          // this.router.navigate(['/admin'])
        } else if (data.status == 400) {
          alert("Change Password Failed!");
          this.router.navigate(['/resetpassword'])
        } 
        // else if (user.role == 4) {
        //   this.router.navigateByUrl('/staff');
        // }
        

      



      // luu lai trang trc roi quay lai trang do, sau do xoa di
      // this.router.navigateByUrl('/students');
      // localStorage.setItem('token', res.result);
    },

      error => {
        alert("Change Password Failed!");
        this.router.navigate(['/resetpassword'])
        console.log(error)
        // this.router.navigate(['/login']);
      }

    );


  }

}
