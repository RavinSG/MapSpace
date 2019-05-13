import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../services/user.service';
import {Chart} from 'chart.js';
import {animate, state, style, transition, trigger} from '@angular/animations';

export interface LandDetail {
  Land_Area: string;
  ID: number;
  Price: number;
  City: string;
  description: string;
  src: string;
}

const LAND_DATA: LandDetail[] = [
  {
    ID: 1,
    Land_Area: 'Hydrogen',
    Price: 1.0079,
    City: 'H',
    description: `Hydrogen is a chemical element with symbol H and atomic number 1. With a standard
        atomic weight of 1.008, hydrogen is the lightest element on the periodic table.`,
    src: '../../assets/moneybag.jpg'
  }, {
    ID: 2,
    Land_Area: 'Helium',
    Price: 4.0026,
    City: 'He',
    description: `Helium is a chemical element with symbol He and atomic number 2. It is a
        colorless, odorless, tasteless, non-toxic, inert, monatomic gas, the first in the noble gas
        group in the periodic table. Its boiling point is the lowest among all the elements.`,
    src: '../../assets/moneybag.jpg'
  }, {
    ID: 3,
    Land_Area: 'lasldads',
    Price: 6.941,
    City: 'Li',
    description: `Lithium is a chemical element with symbol Li and atomic number 3. It is a soft,
        silvery-white alkali metal. Under standard conditions, it is the lightest metal and the
        lightest solid element.`,
    src: '../../assets/moneybag.jpg'
  }, {
    ID: 4,
    Land_Area: 'Beryllium',
    Price: 9.0122,
    City: 'Be',
    description: `Beryllium is a chemical element with symbol Be and atomic number 4. It is a
        relatively rare element in the universe, usually occurring as a product of the spallation of
        larger atomic nuclei that have collided with cosmic rays.`,
    src: '../../assets/moneybag.jpg'
  }, {
    ID: 8,
    Land_Area: 'Oxygen',
    Price: 15.9994,
    City: 'O',
    description: `Oxygen is a chemical element with symbol O and atomic number 8. It is a member of
         the chalcogen group on the periodic table, a highly reactive nonmetal, and an oxidizing
         agent that readily forms oxides with most elements as well as with other compounds.`,
    src: '../../assets/moneybag.jpg'
  }];


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

  dataSource = LAND_DATA;
  dataColumns = ['Land_Area', 'Price', 'ID', 'City'];
  expandedLand: LandDetail | null;


  public colour = 'lightblue';
  @ViewChild('chart') chartElementRef: ElementRef;
  chart: Chart;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
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
                label: 'Max temp'
              },
              {
                data: temp_min,
                borderColor: '#ffcc00',
                fill: false,
                label: 'Min temp'
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
