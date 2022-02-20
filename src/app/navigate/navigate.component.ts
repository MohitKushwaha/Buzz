import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { VideoFile, Profile } from '../customtype';

@Component({
  selector: 'app-navigate',
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.scss']
})
export class NavigateComponent implements OnInit {

  profile: Profile = {} as Profile;
  records: VideoFile[] = [];

  overlayData: VideoFile = null as unknown as VideoFile;
  constructor(public Backend: BackendService) { }

  ngOnInit(): void {
    if(!this.Backend.serveLoad) this.Backend.getDataProfile();
    
    this.Backend.getProfile().subscribe(pro => {
      this.profile = pro;
    });
    this.Backend.getRecords().subscribe(rec => {
      this.records = rec;
    });
    this.Backend.getOverlayData().subscribe(data => {
      this.overlayData = data;
    });
  }

}
