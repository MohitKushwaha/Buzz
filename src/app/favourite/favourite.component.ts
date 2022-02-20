import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { VideoFile, Profile } from '../customtype';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss']
})
export class FavouriteComponent implements OnInit {

  profile: Profile = {} as Profile;
  records: VideoFile[] = [];

  overlayData: VideoFile = null as unknown as VideoFile;
  favExists: boolean = false;
  constructor(public Backend: BackendService) { }

  changeFav(url: string) {
    for(let i = 0; i < this.records.length; i++) {
      if(this.records[i].url == url) {
        this.records[i].favourite = !this.records[i].favourite;
        this.Backend.setRecords(this.records);
        this.Backend.postDatafile(this.records);
        break;
      }
    }
  }

  ngOnInit(): void {
    if(!this.Backend.serveLoad) this.Backend.getDataProfile();
    
    this.Backend.getProfile().subscribe(pro => {
      this.profile = pro;
    });
    this.Backend.getRecords().subscribe(rec => {
      this.records = rec;
      for(let c = 0; c < this.records.length; c++) {
        if(this.records[c].favourite) {
          this.favExists = true;
          break;
        }
      }
    });
    this.Backend.getOverlayData().subscribe(data => {
      this.overlayData = data;
    });
  }

}
