import { HttpClient } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { ApiService } from 'src/app/api.service';
import { SuccessDialogComponentComponent } from '../create-account/success-dialog-component/success-dialog-component.component';

@Component({

  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.css']
})

export class AccountManagerComponent implements OnInit {


  page?: number;
  limit?: number;
  accounts?: any[];

  constructor(private api: ApiService, private router: Router, 
    private route: ActivatedRoute, private http: HttpClient,
    private dialog: MatDialog){}
    
  ngDepartment = ["IT", "HR", "Marketing", "Sales", "Finance", "Admin"];
  ngOptionrole = ["Admin", "QMA", "ABC", "Staff"];
  public aElement?: boolean = true;

 
  onclick() {
    this.aElement = !this.aElement;
    
   
  }
  
  ngOnInit() {

      this.route.queryParams.subscribe(params => {
        this.page = +params['page'] || 1;
        this.limit = +params['limit'] || 5;
        //Lấy danh sách tài khoản từ API
        this.api.getUsers(this.page.toString(), this.limit.toString()).subscribe((data: any) => {
          console.log(data)
          var d = JSON.parse(data);
          this.accounts = d.data.listUser;

          console.log()
        },
        error => {
          console.log(error);
        }
        
        );
      });

  }

  
  editAccountForm = new FormGroup({
    image: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    username: new FormControl('', [Validators.required, Validators.minLength(5)]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.minLength(9)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    role: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required])})
  
  delete(id: string) {
    confirm("Are you sure you want to delete this account?")
    this.api.deleteUser(id).subscribe((data: any) => {
      window.location.reload();
      
      alert("Delete Successful!")

      
      
    },
    error => {
      alert("Delete Failed!")
    }
    
    );
    }


    EditAccountForm(data: any) {
      //get password from localstorage
      var formData: any = new FormData();
      
      formData.append('firstName', this.editAccountForm.get('firstName')!.value?.toString());
      formData.append('lastName', this.editAccountForm.get('lastName')!.value);
      formData.append('username', this.editAccountForm.get('username')!.value);
      formData.append('email', this.editAccountForm.get('email')!.value);
      formData.append('role', this.editAccountForm.get('role')!.value);
      formData.append('password', this.editAccountForm.get('password')!.value);
      formData.append('department', this.editAccountForm.get('department')!.value);
      
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
                password: this.editAccountForm?.get('password')?.value,
              },
            });
          
            dialogRef.afterClosed().subscribe(() => {
              // Xử lý sau khi dialog đóng lại (nếu cần)
            });
            this.editAccountForm.reset();
            
            this.router.navigate(['/admin/'])
          
            // this.router.navigate(['/admin'])
          } else if (data.status == 400) {
            alert("Edit Account Failed!")
          } 

      },
  
        error => {
          alert("Edit Account Failed!")
          
          console.log(error)
          // this.router.navigate(['/login']);
        }
  
      );
  
  
    }

  
  


  
  

  

 
}
