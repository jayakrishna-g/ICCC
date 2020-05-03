import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';
import { DataService } from '../data.service';

// tslint:disable-next-line: prefer-const
declare var google: any;
let user : any;

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
        console.log(res);
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
  user.ContestDetails.forEach(item => {
      // tslint:disable-next-line: radix
      Ratingrows.push([parseInt(item.ContestID) , parseInt(item.Rating)]) ;
      // tslint:disable-next-line: radix
      Rankrows.push([parseInt(item.ContestID),parseInt(item.Rank)]);
    });
  rating.addRows(Ratingrows);
  ranks.addRows(Rankrows);
  const Ratingoptions = {
      hAxis: {
      title: 'Rating'
      },
      vAxis: {
      title: 'ContestID'
      }
  };
  const Rankoptions = {
    hAxis: {
    title: 'Rank'
    },
    vAxis: {
    title: 'ContestID'
    }
  };

  const Ratingchart = new google.visualization.LineChart(document.getElementById('chart_div'));
  Ratingchart.draw(rating, Ratingoptions);
  const Rankschart = new google.visualization.LineChart(document.getElementById('chart_div1'));
  Rankschart.draw(ranks, Rankoptions);
}
