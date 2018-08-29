import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router'
import { FormsModule } from '@angular/forms'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatSidenavModule } from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApiService } from './api.service';
import { HttpClientModule } from '../../node_modules/@angular/common/http';
import { ChatComponent } from './chat/chat.component';
import { HelperService } from './helper.service';
import { GroupListComponent } from './group-list/group-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    GroupListComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'chat', component: ChatComponent, pathMatch: 'full' },
      { path: 'chat/:roomId', component: ChatComponent, pathMatch: 'full' },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: '**', redirectTo: 'home' },
    ]),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    MatSidenavModule
  ],
  providers: [ApiService, HelperService],
  bootstrap: [AppComponent],

})
export class AppModule { }
