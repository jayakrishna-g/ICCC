import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingsComponent } from './ratings/ratings.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { CollegeComponent } from './college/college.component';
import { CollegeDetailsComponent } from './college-details/college-details.component';


const routes: Routes = [
  {path: '' , component : UserComponent},
  {path: 'ratings/:query' , component : RatingsComponent},
  {path: 'player' , component : UserComponent},
  {path: 'player/:username' , component : UserDetailsComponent},
  {path: 'college' , component : CollegeComponent},
  {path: 'college/:collegename' , component : CollegeDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
