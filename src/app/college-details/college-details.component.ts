import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


// tslint:disable-next-line: prefer-const
declare var google: any;
let college: any;

@Component({
  selector: 'app-college-details',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.css']
})
export class CollegeDetailsComponent implements OnInit {

  college;
  tp = 0;
  dataloaded: Promise<boolean>;
  constructor(
    private router: Router,
    data: DataService
  ) {
      data.getuserdetails(router.url).subscribe((res) => {
        college = res;
        this.college = res;
        // console.log(college)
        for (const i in college.Participations) {
          if (college.Participations.hasOwnProperty(i)) {
            this.tp += college.Participations[i].Total;
          }
        }
        google.charts.load('current', {packages: ['corechart', 'line']});
        google.charts.setOnLoadCallback(drawGraphs);
        this.dataloaded = Promise.resolve(true);
      });
  }

  ngOnInit(): void {
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
