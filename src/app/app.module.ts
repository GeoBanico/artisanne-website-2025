import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NZ_ICONS, NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline, IdcardOutline, LoginOutline } from '@ant-design/icons-angular/icons';
const icons = [UserOutline, LockOutline, IdcardOutline, LoginOutline];
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './main/header/header.component';
import { FooterComponent } from './main/footer/footer.component';
import { BodyComponent } from './main/body/body.component';
import { PromotionalComponent } from './main/body/promotional/promotional.component';
import { ServicesComponent } from './main/body/services/services.component';
import { AuthGuard } from './guard/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent,
    PromotionalComponent,
    ServicesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    NzIconModule.forRoot(icons),
    NzCardModule,
    BrowserAnimationsModule,
    NzModalModule,
    NzDividerModule
  ],
  providers: [
    AuthGuard,
    { provide: NZ_ICONS, useValue: icons }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
