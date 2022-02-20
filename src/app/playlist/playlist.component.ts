import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { VideoFile, Profile } from '../customtype';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.scss']
})
export class PlaylistComponent implements OnInit {

  profile: Profile = {} as Profile;
  records: VideoFile[] = [];
  playlists: Record<string, any> = {};
  playCode: number = 0;

  overlayData: VideoFile = null as unknown as VideoFile;
  constructor(public Backend: BackendService) { }

  createPlaylist() {
    let titleRef: HTMLInputElement = document.getElementById("playlist-title") as HTMLInputElement;
    let title: string = titleRef.value;
    if(this.profile.playlists.indexOf(title) == -1) {
      this.profile.playlists.push(title);
      this.playlists[title] = 0;
      this.Backend.setProfile(this.profile);
      this.Backend.postProfilefile(this.profile);
      this.playCode = 1;
      titleRef.value = "";
    } else this.playCode = 2;

    setTimeout(() => this.playCode = 0, 3000);
  }
  deletePLaylist(playlist: string) {
    this.profile.playlists.splice(this.profile.playlists.indexOf(playlist), 1);
    this.Backend.setProfile(this.profile);
    this.Backend.postProfilefile(this.profile);

    let changeFlag: boolean = false;
    for(let i = 0; i < this.records.length; i++) {
      let ind: number = this.records[i].playlists.indexOf(playlist);
      if(ind > -1) {
        this.records[i].playlists.splice(ind, 1);
        changeFlag = true;
      }
    }
    if(changeFlag) {
      this.Backend.setRecords(this.records);
      this.Backend.postDatafile(this.records);
    }
  }
  ngOnInit(): void {
    if(!this.Backend.serveLoad) this.Backend.getDataProfile();
    
    this.Backend.getProfile().subscribe(pro => {
      this.profile = pro;
    });
    this.Backend.getRecords().subscribe(rec => {
      this.records = rec;
      this.playlists = {};
      this.records.forEach(r => {
        r.playlists.forEach(p => {
          if(this.playlists[p]) this.playlists[p]++;
          else this.playlists[p] = 1;
        })
      })
    });
    this.Backend.getOverlayData().subscribe(data => {
      this.overlayData = data;
    });
  }

}