import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { VideoFile, Profile, HistoryVid } from '../customtype';

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {

  profile: Profile = {} as Profile;
  records: VideoFile[] = [];
  record: VideoFile = {} as VideoFile;
  recordIndex: number = -1;

  historyList: HistoryVid[] = [];
  constructor(private Backend: BackendService) { }

  startMilli: number = 0;
  close() {
    let tempVid: HTMLVideoElement = (document.getElementById("overlayVideo") as HTMLVideoElement);
    tempVid.pause();
    let historyTemp: HistoryVid = {
      url: this.record.url,
      milli: "" + this.startMilli,
      duration: tempVid.currentTime
    };
    
    for(let c = 0; c < this.historyList.length; c++) {
      if(this.historyList[c].url == this.record.url) {
        this.historyList.splice(c, 1);
        break;
      } else if(c == 49) {
        this.historyList.splice(0, 1);
        break;
      }
    }
    this.historyList.push(historyTemp);
    this.Backend.setHistory(this.historyList);
    this.Backend.postHistoryfile(this.historyList);

    this.Backend.setOverlayData({
      "url": "",
      "title": "",
      "description": "",
      "author": "",
      "credits": "",
      "duration": 0,
      "addeddate": new Date(0),
      "addedtime": "00:00",
      "lastplayeddate": new Date(0),
      "lastplayedtime": "00:00",
      "lastplayedtill": 0,
      "favourite": false,
      "playlists": [],
      "tags": []
    });
  }

  changeFav() {
    this.record.favourite = !this.record.favourite;

    if(this.recordIndex > -1) {
      this.records[this.recordIndex].favourite = this.record.favourite;
      this.Backend.setRecords(this.records);
      this.Backend.postDatafile(this.records);
    } else {
      for(let i = 0; i < this.records.length; i++) {
        if(this.records[i].url == this.record.url) {
          this.recordIndex = i;
          this.records[i].favourite = this.record.favourite;
          this.Backend.setRecords(this.records);
          this.Backend.postDatafile(this.records);
          break;
        }
      }
    }
  }
  changePlaylist(playlist: string) {
    let ind: number = this.record.playlists.indexOf(playlist);
    if(ind > -1) this.record.playlists.splice(ind, 1);
    else this.record.playlists.push(playlist);

    if(this.recordIndex > -1) {
      this.records[this.recordIndex].playlists = this.record.playlists;
      this.Backend.setRecords(this.records);
      this.Backend.postDatafile(this.records);
    } else {
      for(let i = 0; i < this.records.length; i++) {
        if(this.records[i].url == this.record.url) {
          this.recordIndex = i;
          this.records[i].favourite = this.record.favourite;
          this.Backend.setRecords(this.records);
          this.Backend.postDatafile(this.records);
          break;
        }
      }
    }
  }

  ngOnInit(): void {
    this.Backend.getProfile().subscribe(pro => {
      this.profile = pro;
    });
    this.Backend.getOverlayData().subscribe(rec => {
      this.record = rec;
      let tempVid: HTMLVideoElement = document.getElementById("overlayVideo") as HTMLVideoElement;
      tempVid.src = this.record.url;
      tempVid.load();
      let descRef: HTMLDivElement = document.getElementById("desc") as HTMLDivElement;
      descRef.innerHTML = this.record.description;
      
      this.startMilli = Date.now();
    });
    this.Backend.getRecords().subscribe(rec => {
      this.records = rec;
    });
    this.Backend.getHistory().subscribe(history => {
      this.historyList = history;
    });
  }

}
