import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-salad-page',
  templateUrl: './salad-page.component.html',
  styleUrls: ['./salad-page.component.scss']
})
export class SaladPageComponent implements OnInit {

  // Get formSalad from saladFormComponent to display message in saladForm and not in formulars
  formSalad: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  onGetControls($event: FormGroup) {
    this.formSalad = $event;
  }

}
