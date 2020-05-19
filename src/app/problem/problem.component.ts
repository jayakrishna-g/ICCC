import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.css']
})
export class ProblemComponent implements OnInit {
  problem;
  url;
  safeUrl: SafeResourceUrl;
  dataloaded: Promise<boolean>;
  constructor(public sanitizer: DomSanitizer, private router: Router, data: DataService)
  {
    data.getproblemdetails(router.url).subscribe(res => {
      this.problem = res[0];
      this.dataloaded = Promise.resolve(true);
      this.url = 'https://www.hackerearth.com/problem-iframe/algorithm/' + this.problem.Slug + '/';
      this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    });
  }

  ngOnInit(): void {
  }

}
