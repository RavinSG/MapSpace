import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {LandDataService} from '../services/land-data.service';
import {Chart} from 'chart.js';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {LandDetail, SavedLand} from '../shared/landDetails';
import {MatTableDataSource} from '@angular/material';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class DashboardComponent implements OnInit {

  dataSource;
  dataColumns = ['Land_Area', 'Price', 'ID', 'City'];
  expandedLand: LandDetail | null;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource2: [SavedLand];

  public colour = 'lightblue';
  @ViewChild('chart') chartElementRef: ElementRef;
  chart: Chart;

  constructor(private userService: UserService,
              private landService: LandDataService) {
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.landService.getSavedLands().subscribe(data => this.dataSource2 = data);
    this.landService.getLandValues().subscribe(data => this.dataSource = new MatTableDataSource(data));
    this.userService.dailyForecast()
      .subscribe(res => {
        const temp_max = res['list'].map(res => res.main.temp_max);
        const temp_min = res['list'].map(res => res.main.temp_min);
        const alldates = res['list'].map(res => res.dt);
        console.log(alldates);
        const weatherDates = [];

        alldates.forEach((res) => {
          const jsdate = new Date(res * 1000);
          weatherDates.push(jsdate
            .toLocaleTimeString('en', {day: 'numeric', hour: 'numeric'}));
        });
        const context = this.chartElementRef.nativeElement;
        this.chart = new Chart(context, {
          type: 'line',
          data: {
            labels: weatherDates,
            datasets: [
              {
                data: temp_max,
                borderColor: '#3cba9f',
                fill: false,
                label: 'Temperature'
              }
            ]
          },
          options: {
            legend: {
              display: true,
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }]
            }
          }
        });
      });

  }


}
