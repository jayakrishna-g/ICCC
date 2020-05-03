import { Component, OnInit } from '@angular/core';
import {DataService} from '../data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  fact;
  constructor(private data: DataService,public router: Router ) {
    data.getrandomfact().subscribe((res) => {
      const len = Math.floor(Math.random() * 1000);
      this.fact = res[len];
    });
  }

  ngOnInit(): void {
  }
  submit(){
    const s = ((document.getElementById('Handle') as HTMLInputElement).value);
    this.router.navigate(['player',s]);
  }
}
