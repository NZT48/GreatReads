import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RecaptchaModule, RecaptchaFormsModule } from 'ng-recaptcha';
import { FileUploadModule } from 'ng2-file-upload';
import { MomentModule } from 'ngx-moment';
import { ChartsModule } from 'ng2-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { ResetComponent } from './reset/reset.component';
import { BookProfileComponent } from './book-profile/book-profile.component';
import { BookTimelineComponent } from './book-timeline/book-timeline.component';
import { EventProfileComponent } from './event-profile/event-profile.component';
import { EventTimelineComponent } from './event-timeline/event-timeline.component';
import { AddBookComponent } from './add-book/add-book.component';
import { AddEventComponent } from './add-event/add-event.component';
import { UsersComponent } from './users/users.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ModeratorPanelComponent } from './moderator-panel/moderator-panel.component';
import { PdfReaderComponent } from './pdf-reader/pdf-reader.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    AdminPanelComponent,
    ChangePasswordComponent,
    UserProfileComponent,
    ResetComponent,
    BookProfileComponent,
    BookTimelineComponent,
    EventProfileComponent,
    EventTimelineComponent,
    AddBookComponent,
    AddEventComponent,
    UsersComponent,
    NotificationsComponent,
    ModeratorPanelComponent,
    PdfReaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FileUploadModule,
    MomentModule,
    ChartsModule,
    NgxPaginationModule,
    NgxExtendedPdfViewerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
