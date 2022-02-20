import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { VideoFile, Profile } from '../customtype';
import { TAGLIST } from '../lists';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  profile: Profile = {} as Profile;
  records: VideoFile[] = [];

  creditsList: Record<string,any> = {};
  tagList: Record<string,any> = {};

  tagNameParent: string = "";
  tagListFull: Object = TAGLIST;
  constructor(public Backend: BackendService) { }

  ngOnInit(): void {
    if(!this.Backend.serveLoad) this.Backend.getDataProfile();
    
    this.Backend.getProfile().subscribe(pro => {
      this.profile = pro;
    });
    this.Backend.getRecords().subscribe(rec => {
      this.records = rec;
      for(let tag in TAGLIST) this.tagList[tag] = 0;
      
      this.records.forEach(ele => {
        if(this.creditsList[ele.credits]) this.creditsList[ele.credits]++;
        else this.creditsList[ele.credits] = 1;

        ele.tags.forEach(t => {
          if(this.tagList[t] > -1) this.tagList[t]++;
        })
      })
    });
  }

}
