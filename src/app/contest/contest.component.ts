import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

export interface ContestData {
  ProblemID: number;
  ContestID: number;
  Name: string;
  Accuracy: string;
  ProblemUrl: string;
  Score: number;
  Slug: string;
}

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.css']
})
export class ContestComponent implements OnInit {
  displayedColumns: string[] = ['Problem', 'Accuracy', 'Score'];
  dataSource: MatTableDataSource<ContestData>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  contestdetails;
  dataloaded: Promise<boolean>;

  constructor(private data: DataService , public router: Router) {
    this.data.getcontestdetails(router.url).subscribe(res => {
      const ds = [];
      this.contestdetails = res;
      this.dataloaded = Promise.resolve(true);
      this.contestdetails.forEach(element => {
        const url = '/contest/' + element.ContestID + '/problem/' + element.ProblemID;
        ds.push({
          ProblemID: element.ProblemID,
          ContestID: element.ContestID,
          Name: element.Name,
          Accuracy: element.Accuracy,
          Score: element.Score,
          Slug: element.Slug,
          ProblemUrl: url
        });
      });
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
  submit(): void{
    this.router.navigate(['leaderboard', this.contestdetails[0].ContestID]);
  }
}

