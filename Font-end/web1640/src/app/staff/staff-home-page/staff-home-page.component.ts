import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-staff-home-page',
  templateUrl: './staff-home-page.component.html',
  styleUrls: ['./staff-home-page.component.css']
})
export class StaffHomePageComponent implements OnInit {
  ngListEvent = [ "Event 1", "Event 2","Event3"];
  ngListCategory = [ "Category 1", "Category 2","Category3"];
  ngListDepartment = [ "Department 1", "Department 2","Department3"];

  constructor() { }

  ngOnInit(): void {
  }

}


