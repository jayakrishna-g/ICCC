import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

// tslint:disable-next-line: prefer-const
declare var google: any;
let college: any;


export interface ContestsData {
  ContestName: string;
  ContestUrl: string;
  LeaderboardUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  displayedColumns: string[] = ['ContestName', 'Practice', 'Leaderboard'];
  dataSource: MatTableDataSource<ContestsData>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  Contests;
  tp = 0;
  tc = 0;
  dataloaded: Promise<boolean>;
  constructor(private data: DataService, router: Router) {
    this.data.getleaderboard('/college/').subscribe(res => {
      const ds = [];
      college = res;
      this.Contests = res;
      for (const i in this.Contests.Participations) {
        if (this.Contests.Participations.hasOwnProperty(i)) {
          this.tp += this.Contests.Participations[i].Total;
        }
      }
      google.charts.load('current', {packages: ['corechart', 'line']});
      google.charts.setOnLoadCallback(drawGraphs);
      this.dataloaded = Promise.resolve(true);
      for (const key in this.Contests.Participations) {
        if (this.Contests.Participations.hasOwnProperty(key)) {
          // tslint:disable-next-line: radix
          const element = key;
          const lurl = '/leaderboard/' + element;
          const purl = '/contest/' + element;
          const name = 'Inter College Contest' + element;
          ds.push({
            ContestName: name,
            LeaderboardUrl: lurl,
            ContestUrl: purl
          });
        }
      }
      this.tc = ds.length;
      this.dataSource = new MatTableDataSource(ds);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}


function drawGraphs() {
  const data = new google.visualization.DataTable();
  data.addColumn('number' , 'Contest');
  data.addColumn('number', 'Participations');
  let PMax = 0;
  let PMin = 10000;
  const PRows = [];
  for (const i in college.Participations) {
    if (i) {
    // tslint:disable-next-line: radix
    PRows.push([parseInt(i) , college.Participations[i].Total ]);
    PMax = Math.max(PMax, college.Participations[i].Total);
    PMin = Math.min(PMax, college.Participations[i].Total);
    }
  }
  data.addRows(PRows);
  const options = {
    hAxis: {
      title: 'ContestID',
      format: 'decimal',
      },
      vAxis: {
      title: 'Participations',
      format: 'decimal',
      viewWindow : {
        min : 0,
        max : PMax + 30,
      }
      },
      legend : {position : 'none'}
  };

  const chart = new google.charts.Line(document.getElementById('chart1'));

  chart.draw(data, google.charts.Line.convertOptions(options));
}
