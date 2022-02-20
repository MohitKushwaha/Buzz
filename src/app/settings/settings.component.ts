import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { Profile } from '../customtype';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  profile: Profile = {} as Profile;
  updateVisi: boolean = false;
  updSuccess: boolean = false;
  constructor(public Backend: BackendService) { }

  update() {
    let uname: string = (document.getElementById("username") as HTMLInputElement).value;
    let org: string = (document.getElementById("organisation") as HTMLInputElement).value;
    console.log(uname, org);
    this.profile.username = uname;
    this.profile.organisation = org;
    this.Backend.setProfile(this.profile);
    this.Backend.postProfilefile(this.profile);
    this.updateVisi = false;
    this.updSuccess = true;
    setInterval(() => this.updSuccess = false, 3000);
  }
  ngOnInit(): void {
    if(!this.Backend.serveLoad) this.Backend.getDataProfile();
    
    this.Backend.getProfile().subscribe(pro => {
      this.profile = pro;
    });
  }

}
