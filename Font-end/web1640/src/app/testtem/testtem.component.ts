import { AfterViewInit, Component, OnInit } from '@angular/core';
import PerfectScrollbar from 'perfect-scrollbar';

@Component({
  
  templateUrl: './testtem.component.html',
  styleUrls: ['./testtem.component.css']
})
export class TesttemComponent implements AfterViewInit {

  constructor() { }
  ngAfterViewInit(): void {
    const socialListScrollbar = new PerfectScrollbar('.dashboard-social-list');
    const topCountriesScrollbar = new PerfectScrollbar('.dashboard-top-countries');
  }

  // ngOnInit(): void {
  //   const socialListScrollbar = new PerfectScrollbar('.dashboard-social-list');
  //   const topCountriesScrollbar = new PerfectScrollbar('.dashboard-top-countries');
  // }

}
