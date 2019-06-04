import { Component, OnInit } from '@angular/core';
import { DessertsDataService } from 'src/app/services/desserts-data.service';

@Component({
  selector: 'app-desserts',
  templateUrl: './desserts.component.html',
  styleUrls: ['./desserts.component.scss']
})
export class DessertsComponent implements OnInit {

  constructor(private dessertData: DessertsDataService) { }

  dessertsList: object;

  ngOnInit() {
    this.dessertData.getDesserts()
    .subscribe(dessert => {
      this.dessertsList = dessert;
    });
  }

}
