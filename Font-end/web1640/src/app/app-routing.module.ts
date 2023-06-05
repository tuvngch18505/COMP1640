import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountManagerComponent } from './admin/account-manager/account-manager.component';
import { AdminComponent } from './admin/admin.component';
import { CreateAccountComponent } from './admin/create-account/create-account.component';
import { TopicAndDeadLineComponent } from './admin/topic-and-dead-line/topic-and-dead-line.component';
import { TopicListComponent } from './admin/topic-list/topic-list.component';
import { LoginComponent } from './login/login.component';
import { QamComponent } from './qam/qam.component';
import { TopicmanagerComponent } from './qam/topicmanager/topicmanager.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EachEventComponent } from './staff/each-event/each-event.component';
import { StaffHomePageComponent } from './staff/staff-home-page/staff-home-page.component';
import { StaffComponent } from './staff/staff.component';
import { TesttemComponent } from './testtem/testtem.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'testtem', component: TesttemComponent },
  {path: 'qam', component: QamComponent,
    children: [
      { path: 'topicmanager', component: TopicmanagerComponent }
    ]},
  { path: 'resetpassword', component: ResetPasswordComponent},
  { path: 'admin', component: AdminComponent,
    children: [
      { path: 'createaccount', component: CreateAccountComponent },
      { path: 'accountmanager', component: AccountManagerComponent},
      { path: 'topicanddeadline', component: TopicAndDeadLineComponent},
      { path: 'topiclist', component: TopicListComponent}
    ],
 },
  { path: 'staff', component: StaffComponent ,
    children: [
      {path: 'homepage', component: StaffHomePageComponent},
      {path: 'eachevent', component: EachEventComponent}
    ]},

]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
