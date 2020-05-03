import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RatingsComponent } from './ratings/ratings.component';
import { UserComponent } from './user/user.component';
import { UserDetailsComponent } from './user-details/user-details.component';


const routes: Routes = [
  {path: '' , component : RatingsComponent},
  {path: 'ratings/:query' , component : RatingsComponent},
  {path: 'player' , component : UserComponent},
  {path: 'player/:username' , component : UserDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
