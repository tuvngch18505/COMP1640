import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

interface NewDeadline {

  Topic: string | null,
  DLTopic: string | null,
  DLComment: string | null,
  Description: string | null,

}
@Component({

  templateUrl: './topic-and-dead-line.component.html',
  styleUrls: ['./topic-and-dead-line.component.css']
})


export class TopicAndDeadLineComponent {
  ngOptionTopic = ["", "Topic 1", "Topic 2", "Topic 3", "Topic 4",]

  newDeadline: NewDeadline = {
    Topic: null,
    DLTopic: null,
    DLComment: null,
    Description: null,



  };

  deadlineForm = new FormGroup({
    Topic: new FormControl('', [Validators.required]),
    DLTopic: new FormControl('', [Validators.required]),
    DLComment: new FormControl('', [Validators.required]),
    Description: new FormControl('', [Validators.required]),
  })

  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router) {

  } //dependency injection
  ngOnInit(): void {

    // this.newaccount();
    // this.newAccountForm.reset();

  }
  DeadlineForm = new FormGroup({
    Topic: new FormControl(''),
    DLTopic: new FormControl(''),
    DLComment: new FormControl(''),
    Description: new FormControl(''),

  })

  createDeadline = new FormGroup({
    Topic: new FormControl(''),
    DLTopic: new FormControl(''),
    DLComment: new FormControl(''),
    Description: new FormControl(''),
    
  }
  )
  CreateDeadline(data: any) {
    //get password from localstorage
    var deadline: any = localStorage.getItem('deadline');
    var topic = JSON.parse(deadline).Topic;;
    // console.log("dsadsds" + phone);

    this.deadline = {
      Topic: data.Topic,
      DLTopic: data.DLTopic,
      DLComment: data.DLComment,
      Description: data.Description,
    }

    console.log("hii");
    // this.api.CreateDeadline(this.deadline
    // ).subscribe(res => {

    //   var d = JSON.parse(res); //doi tu json sang object
    //   const helper = new JwtHelperService();
    //   console.log("okeee", d.deadline)
    //   const decoedToken = helper.decodeToken(d.deadline);
    //   console.log("okeee", d.deadline)
    //   console.log("d", decoedToken);

    //   alert("Tạo tài khoản thành công!");

    //   // this.router.navigateByUrl('/students/profilestudent');
    //   this.router.navigateByUrl('/admin');
    // },

    //   error => {
    //     console.log("Error", error);
    //     alert("Error");
    //     this.router.navigateByUrl('/admin/TopicandDeadline');
    //   }

    // );


  }
  deadline: NewDeadline = {
  
    Topic: null,
    DLTopic: null,
    DLComment: null,
    Description: null,


  };

  reloadParent() {
    this.ngOnInit();
  }


}








