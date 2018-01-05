import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AssignPeoplePage } from './assign-people';

@NgModule({
  declarations: [
    AssignPeoplePage,
  ],
  imports: [
    IonicPageModule.forChild(AssignPeoplePage),
  ],
})
export class AssignPeoplePageModule {}
