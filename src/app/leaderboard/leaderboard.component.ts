import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

export interface UserData {
  Rank: number;
  Handle: string;
  Score: string;
  ProfileUrl: string;
  P0: string;
  P1: string;
  P2: string;
  P3: string;
  P4: string;
  color: string;
}


@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  displayedColumns: string[] = ['Rank', 'Handle', 'Score', 'P0', 'P1', 'P2' , 'P3' , 'P4'];
  dataSource: MatTableDataSource<UserData>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  leaderboard;
  constructor(private data: DataService , router: Router) {
    this.data.getleaderboard(router.url).subscribe(res => {
      const ds = [];
      this.leaderboard = res;
      this.leaderboard.forEach(element => {
        let color = 'green';
        if (element.Rating >= 2400) {
          color = 'red';
        } else if (element.Rating >= 2000) {
          color = 'orange';
        } else if (element.Rating >= 1800) {
          color = 'yellow';
        } else if (element.Rating >= 1600) {
          color = 'fuchsia';
        } else if (element.Rating >= 1400) {
          color = 'aqua';
        } else if (element.Rating >= 1200) {
          color = 'green';
        } else {
          color = 'gray';
        }
        ds.push({
          color,
          Rank: element.Rank,
          Handle: element.Handle,
          ProfileUrl: '/player/' + element.Handle,
          Score: 0,
          P0: element.Problems[0].Score,
          P1: element.Problems[1].Score,
          P2: element.Problems[2].Score,
          P3: element.Problems[3].Score,
          P4: element.Problems[4].Score
        });
      });
      ds.forEach(ele => {
        let k = Number(ele.P0);
        if (k && k >= 0){
          ele.Score += k;
        }
        k = Number(ele.P1);
        if (k && k >= 0){
          ele.Score += k;
        }
        k = Number(ele.P2);
        if (k && k >= 0){
          ele.Score += k;
        }
        k = Number(ele.P3);
        if (k && k >= 0){
          ele.Score += k;
        }
        k = Number(ele.P4);
        if (k && k >= 0){
          ele.Score += k;
        }
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
}
