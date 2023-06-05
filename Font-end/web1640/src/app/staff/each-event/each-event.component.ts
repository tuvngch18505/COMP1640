import { Component } from '@angular/core';

@Component({
  selector: 'app-each-event',
  templateUrl: './each-event.component.html',
  styleUrls: ['./each-event.component.css']
})
export class EachEventComponent {
  ngListCategory = [ "Category 1", "Category 2","Category3"];
}
