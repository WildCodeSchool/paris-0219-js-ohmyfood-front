import { Component, OnInit } from '@angular/core';
import { DessertsDataService } from '../../services/desserts-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {

  dessertList: object; // desserts data get from the API

  constructor(private dessertsData: DessertsDataService) { }

  ngOnInit() {
    this.dessertsData.getDesserts()
    .subscribe(desserts => {
      this.dessertList = desserts; // Get desserts data from API
      console.log(desserts);
    });
  }

}
