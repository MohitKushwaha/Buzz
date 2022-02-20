import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppBarComponent } from './app-bar/app-bar.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SettingsComponent } from './settings/settings.component';
import { NavigateComponent } from './navigate/navigate.component';
import { OverlayComponent } from './overlay/overlay.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { HistoryComponent } from './history/history.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppBarComponent,
    NavBarComponent,
    SettingsComponent,
    NavigateComponent,
    OverlayComponent,
    FavouriteComponent,
    HistoryComponent,
    PlaylistComponent,
    TagListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
