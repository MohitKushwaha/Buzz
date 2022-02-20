import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { VideoFile, Profile, HistoryVid } from '../customtype';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  records: VideoFile[] = [];
  history: HistoryVid[] = [];
  historyData: Record<string, any> = {};
  latestHistory: HistoryVid[] = [];
  overlayData: VideoFile = null as unknown as VideoFile;

  dateVal: number = 0;
  curDate: number = Date.now();
  constructor(public Backend: BackendService) { }

  updateHistoryList() {
    this.records.forEach(ele => {
      this.historyData[ele.url] = ele;
    })

    let eleRefs = document.getElementsByTagName("video") as HTMLCollection;
    for(let c = 0; c < eleRefs.length; c++) {
      (eleRefs[0] as HTMLVideoElement).load();
    }
  }
  ngOnInit(): void {
    this.dateVal = this.Backend.sessionDate > 0 ? Math.trunc((Date.now() - this.Backend.sessionDate) / 1000) : 0;
    setInterval(() => {
      this.dateVal++;
      this.curDate = Date.now();
    }, 1000)

    if(!this.Backend.serveLoad) this.Backend.getDataProfile();

    this.Backend.getRecords().subscribe(rec => {
      this.records = rec;
      this.updateHistoryList();
    });
    this.Backend.getHistory().subscribe(data => {
      this.history = data;
      this.latestHistory = [];
      for(let c = this.history.length; c > this.history.length - 5 && c > 0; c--) this.latestHistory.push(this.history[c-1]);
    });
    this.Backend.getOverlayData().subscribe(data => {
      this.overlayData = data;
    });
  }

}
