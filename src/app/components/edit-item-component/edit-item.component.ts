import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {

  title: String;
  description: String;

  constructor() { }

  ngOnInit() {
  }

  editItem() {
  }

}
