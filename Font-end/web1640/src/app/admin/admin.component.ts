import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
 
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements AfterViewInit, OnInit {
  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0); // load lại giao diện
        // load lại các file CSS và JavaScript bằng cách tạo một thẻ <link> hoặc <script> mới
      }
    });
  }

  ngOptionRole = ["Admin", "Staff", "QMA"];
  constructor(private router: Router) { }


  ngAfterViewInit(): void {
    const socialListScrollbar = new PerfectScrollbar('.dashboard-social-list');
    const topCountriesScrollbar = new PerfectScrollbar('.dashboard-top-countries');
  }
}
