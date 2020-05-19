import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingsComponent } from './ratings/ratings.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CollegeComponent } from './college/college.component';
import { CollegeDetailsComponent } from './college-details/college-details.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { HomeComponent } from './home/home.component';
import { ContestComponent } from './contest/contest.component';
import { ProblemComponent } from './problem/problem.component';


const routes: Routes = [
  {path: '' , component : HomeComponent},
  {path: 'ratings/:query' , component : RatingsComponent},
  {path: 'player' , component : UserComponent},
  {path: 'player/:username' , component : UserDetailsComponent},
  {path: 'college' , component : CollegeComponent},
  {path: 'college/:collegename' , component : CollegeDetailsComponent},
  {path: 'leaderboard/:leaderboard' , component : LeaderboardComponent},
  {path: 'contest/:contestid' , component: ContestComponent},
  {path: 'contest/:contestid/problem/:problemid' , component: ProblemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
