import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-college',
  templateUrl: './college.component.html',
  styleUrls: ['./college.component.css']
})
export class CollegeComponent implements OnInit {
  fact;
  dataloaded: Promise<boolean>;
  constructor(private data: DataService,public router: Router ) {
    data.getrandomfact().subscribe((res) => {
      const len = Math.floor(Math.random() * 1000);
      this.fact = res[len];
      this.dataloaded = Promise.resolve(true);
    });
  }

  ngOnInit(): void {
  }
  submit(){
    const s = ((document.getElementById('Handle') as HTMLInputElement).value);
    this.router.navigate(['college', s]);
  }
}
