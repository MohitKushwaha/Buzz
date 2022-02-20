import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { NavigateComponent  } from './navigate/navigate.component';
import { FavouriteComponent  } from './favourite/favourite.component';
import { PlaylistComponent  } from './playlist/playlist.component';
import { HistoryComponent  } from './history/history.component';
import { SettingsComponent  } from './settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'home', component: HomeComponent},
  { path: 'navigate', component: NavigateComponent},
  { path: 'favourite', component: FavouriteComponent},
  { path: 'playlist', component: PlaylistComponent},
  { path: 'history', component: HistoryComponent},
  { path: 'settings', component: SettingsComponent},
  { path: '**', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
