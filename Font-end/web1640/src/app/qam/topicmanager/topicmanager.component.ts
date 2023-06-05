import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
interface LoginDetails {
  Newtopic: string | null,

}
@Component({
  selector: 'app-topicmanager',
  templateUrl: './topicmanager.component.html',
  styleUrls: ['./topicmanager.component.css']
})


export class TopicmanagerComponent implements OnInit {
  status: any;
  addTopicForm! : FormGroup;
  constructor(
    private http: HttpClient,
    private api: ApiService,
    private router: Router) { }

  isShowForm = false;
  addNewTopic() {
    this.isShowForm = false;
  }

  ngOnInit(): void { }

  
  onSubmit(data: any) {


  }

}

