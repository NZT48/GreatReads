import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ModeratorPanelComponent } from './moderator-panel/moderator-panel.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UsersComponent } from './users/users.component';
import { ResetComponent } from './reset/reset.component';
import { BookProfileComponent } from './book-profile/book-profile.component';
import { BookTimelineComponent } from './book-timeline/book-timeline.component';
import { AddBookComponent } from './add-book/add-book.component';
import { EventProfileComponent } from './event-profile/event-profile.component';
import { EventTimelineComponent } from './event-timeline/event-timeline.component';
import { AddEventComponent } from './add-event/add-event.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { PdfReaderComponent } from './pdf-reader/pdf-reader.component';



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin_panel', component: AdminPanelComponent },
  { path: 'moderator_panel', component: ModeratorPanelComponent },
  { path: 'forgot_password', component: ChangePasswordComponent },
  { path: 'change_password', component: ChangePasswordComponent },
  { path: 'user', component: UserProfileComponent },
  { path: 'users', component: UsersComponent },
  { path: 'reset/:token', component: ResetComponent },
  { path: 'user/:username', component: UserProfileComponent },
  { path: 'book/:name', component: BookProfileComponent },
  { path: 'books', component: BookTimelineComponent },
  { path: 'add_book', component: AddBookComponent },
  { path: 'event/:name', component: EventProfileComponent },
  { path: 'events', component: EventTimelineComponent },
  { path: 'add_event', component: AddEventComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'pdf/:name', component: PdfReaderComponent },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
