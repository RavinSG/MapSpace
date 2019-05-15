import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AgmCoreModule, GoogleMapsAPIWrapper} from '@agm/core';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing/app-routing.module';
import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home/home.component';

import {
  MatButtonToggleModule,
  MatExpansionModule,
  MatGridListModule,
  MatMenuModule, MatSelectModule,
  MatSidenavModule, MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import {MatToolbarModule} from '@angular/material';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material';
import {MatButtonModule} from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';

import 'hammerjs';
import {HeaderComponent} from './header/header.component';
import {FooterComponent} from './footer/footer.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {AdminComponent} from './admin/admin.component';
import {AuthGuard} from './services/auth.guard';
import {AuthService} from './services/auth.service';
import {UserService} from './services/user.service';
import {MapDataService} from './services/map-data.service';
import {DrawComponent} from './draw/draw.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    RegisterComponent,
    LoginComponent,
    AdminComponent,
    DrawComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyC_DHvZ8M6MToO0J9OzmIosy6VOsDmmnM0',
      libraries: ['drawing', 'places']
    }),
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    MatMenuModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatTableModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatButtonToggleModule,
    AngularFontAwesomeModule,
    HttpClientModule
  ],
  providers: [GoogleMapsAPIWrapper, UserService, AuthService, AuthGuard, MapDataService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
