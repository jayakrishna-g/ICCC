import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DataService } from '../data.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


export interface UserData {
  Rank: number;
  color: string;
  HackerrankHandle: string;
  Rating: number;
  Volatility : number;
  TimesPlayed: number;
  ProfileUrl: string;
}


@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.css']
})
export class RatingsComponent implements OnInit {

  displayedColumns: string[] = ['Rank', 'Handle', 'Rating', 'Volatility', 'TimesPlayed'];
  dataSource: MatTableDataSource<UserData>;
  users;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private data: DataService , router: Router) {
    // Create 100 users
    this.
    data.getratings(router.url).subscribe((res) => {
      console.log(router.url);
      this.users = res;
      this.users.sort((ele1, ele2) => {
        if (ele1.Rating < ele2.Rating) {
        return 1;
        }
        if (ele1.Rating > ele2.Rating) {
        return -1;
        }
        return 0;
      });
      // Assign the data to the data source for the table to render
      const ds = [];
      let c = 1;
      let prevR = -1;
      this.users.forEach(element => {
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
        const ProfileUrl = '/player/' + element.Handle ;
        ds.push({
          Rank: c,
          Handle: element.Handle,
          Rating: element.Rating,
          TimesPlayed: element.TimesPlayed,
          Volatility: element.Volatility,
          color,
          ProfileUrl
        });
        if (prevR !== element.Rating) {
          c++;
          prevR = element.Rating;
        }
      });
      this.dataSource = new MatTableDataSource(ds);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit() {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
