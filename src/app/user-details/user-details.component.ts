import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../data.service';

// tslint:disable-next-line: prefer-const
declare var google: any;
let user: any;

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})

export class UserDetailsComponent implements OnInit {
  user;
  dataloaded: Promise<boolean>;
  constructor(
    private router: Router,
    data: DataService
  ) {
      data.getuserdetails(router.url).subscribe((res) => {
        user = res;
        this.user = res;
        google.charts.load('current', {packages: ['corechart', 'line']});
        google.charts.setOnLoadCallback(drawGraphs);
        this.dataloaded = Promise.resolve(true);
      });
  }

  ngOnInit() {
  }
}
function drawGraphs() {
  const rating = new google.visualization.DataTable();
  rating.addColumn('number', 'Contest');
  rating.addColumn('number', 'Rating');
  const ranks = new google.visualization.DataTable();
  ranks.addColumn('number', 'Contest');
  ranks.addColumn('number', 'Rank');
  const Ratingrows = [];
  const Rankrows = [];
  let RMin = 1000000;
  let RMax = -1000000;
  user.ContestDetails.forEach(item => {
      // tslint:disable-next-line: radix
      RMin = Math.min(RMin, parseInt(item.Rating));
      // tslint:disable-next-line: radix
      RMax = Math.max(RMax, parseInt(item.Rating));
      // tslint:disable-next-line: radix
      Ratingrows.push([parseInt(item.ContestID) , parseInt(item.Rating)]) ;
      // tslint:disable-next-line: radix
      Rankrows.push([parseInt(item.ContestID), parseInt(item.Rank)]);
    });
  RMin -= RMin % 200;
  RMin = Math.min(RMin, 1200);
  RMax += 10;
  RMax += RMax % 200;
  rating.addRows(Ratingrows);
  ranks.addRows(Rankrows);
  const Ratingoptions = {
      hAxis: {
      title: 'ContestID',
      format: 'decimal',
      minValue : 1200
      },
      vAxis: {
      title: 'Rating',
      format: 'decimal',
      viewWindow : {
        min : RMin,
        max : RMax,
      }
      },
      legend : {position :'none'}
  };
  const Rankoptions = {
    hAxis: {
    title: 'ContestID',
    format : 'decimal'
    },
    vAxis: {
    title: 'Ranks',
    format : 'decimal',
    logScale : 'True'
    },
    
    legend : {position :'none'}
  };

  const Ratingchart = new google.charts.Line(document.getElementById('chart_div'));
  Ratingchart.draw(rating, google.charts.Line.convertOptions(Ratingoptions));
  const Rankschart = new google.charts.Line(document.getElementById('chart_div1'));
  Rankschart.draw(ranks, google.charts.Line.convertOptions(Rankoptions));
}
