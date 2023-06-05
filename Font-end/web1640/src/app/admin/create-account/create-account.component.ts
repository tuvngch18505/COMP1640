import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponentComponent } from './success-dialog-component/success-dialog-component.component';




@Component({
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

 
  ngDepartment = ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"];
  ngOptionrole = ["Admin", "QMA", "ABC", "Staff"];
  public aElement?: boolean = true;

 
  onclick() {
    this.aElement = !this.aElement;
    
   
  }

  

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router,
    // private fb: FormBuilder,
    private dialog: MatDialog) {

  } //dependency injection

  createAccountForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required])})

  ngOnInit(): void {
    // this.newAccount();

    
      
      
    
  }

  
  // createAccountForm = new FormGroup({
  //   image: new FormControl(''),
  //   firstName: new FormControl(''),
  //   lastName: new FormControl(''),
  //   username: new FormControl(''),
  //   email: new FormControl(''),
  //   password: new FormControl(''),
  //   role: new FormControl(''),
  //   department: new FormControl(''),
  // }
  // )
 

  CreateNewAccount(data: any) {
    //get password from localstorage
    var formData: any = new FormData();
    
    formData.append('firstName', this.createAccountForm.get('firstName')!.value?.toString());
    formData.append('lastName', this.createAccountForm.get('lastName')!.value);
    formData.append('username', this.createAccountForm.get('username')!.value);
    formData.append('email', this.createAccountForm.get('email')!.value);
    formData.append('role', this.createAccountForm.get('role')!.value);
    formData.append('password', this.createAccountForm.get('password')!.value);
    formData.append('department', this.createAccountForm.get('department')!.value);


    
    // this. = {
      
    //   firstName: data.firstName,
    //   lastName: data.lastName,
    //   username: data.username,
    //   email: data.email,
    //   password: data.password,
    //   role: data.role,
    //   department: data.department,
      
    // }





    // if(this.loginForm.invalid){
    //     return false;
    // } 
    // truyen du lieu vao form
    // console.log(data.email, data.password);
    // this.router.navigateByUrl('/students');

    // return true;
    // console.log(
    //  this.resetpasswordForm.value);
    // if (this.resetpasswordForm.value.oldpassword != oldPw) {

    //   alert("Mật khẩu cũ không đúng");
    //   return false;
    // }
    // else if (this.resetpasswordForm.value.newpassword != this.resetpasswordForm.value.reNewpassword) {
    //   alert("Mật khẩu mới không trùng khớp");
    //   return false;
    // }
    // else {
    // console.log("hii");

    // var formData = new FormData();
    // formData.append('image', this.createAccountForm.controls.image.value!);
    // formData.append('firstName', this.createAccountForm.controls.firstName.value!);
    // formData.append('lastName', this.createAccountForm.controls.lastName.value!);
    // formData.append('username', this.createAccountForm.controls.username.value!);
    // formData.append('email', this.createAccountForm.controls.email.value!);
    // formData.append('role', this.createAccountForm.controls.role.value!);
    // formData.append('password', this.createAccountForm.controls.password.value!);
    // formData.append('department', this.createAccountForm.controls.department.value!);

    
    // formData.append('firstName', this.myForm?.get('firstName')?.value);
    // formData.append('', this.myForm?.get('')?.value);
    // formData.append('username', this.myForm?.get('username')?.value);
    // formData.append('email', this.myForm?.get('email')?.value);
    // formData.append('role', this.myForm?.get('role')?.value);
    // formData.append('password', this.myForm?.get('password')?.value);
    // formData.append('department', this.myForm?.get('Department')?.value);

    
    
    this.api.createNewAccount( formData
    ).subscribe(res => {

      // alert("Login Successful!");
        var data = JSON.parse(res)

        console.log(res);
        console.log(data.data.username);

        if (data.status == 200) {
          
         
          const dialogRef = this.dialog.open(SuccessDialogComponentComponent, {
            data: {
              username: data.data.username,
              email: data.data.email,
              password: this.createAccountForm?.get('password')?.value,
            },
          });
        
          dialogRef.afterClosed().subscribe(() => {
            // Xử lý sau khi dialog đóng lại (nếu cần)
          });
          this.createAccountForm.reset();
          
          this.router.navigate(['/admin/createaccount'])
        
          // this.router.navigate(['/admin'])
        } else if (data.status == 400) {
          alert("Create Account Failed!")
        } 
        // else if (user.role == 4) {
        //   this.router.navigateByUrl('/staff');
        // }
        

      



      // luu lai trang trc roi quay lai trang do, sau do xoa di
      // this.router.navigateByUrl('/students');
      // localStorage.setItem('token', res.result);
    },

      error => {
        alert("Create Account Failed!")
        
        console.log(error)
        // this.router.navigate(['/login']);
      }

    );


  }
 
  
  reloadParent() {
    this.ngOnInit();
  }


}




