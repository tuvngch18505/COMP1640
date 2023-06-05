import { Component, OnInit } from '@angular/core';

@Component({
 
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit{

  ngListEvent = ["Event 1", "Event 2", "Event 3", "Event 4", "Event 5"];
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

}
