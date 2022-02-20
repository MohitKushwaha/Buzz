import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { VideoFile, Profile, HistoryVid } from './customtype';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  static records$: BehaviorSubject<VideoFile[]> = new BehaviorSubject([] as VideoFile[]);
  static profile$: BehaviorSubject<Profile> = new BehaviorSubject({} as Profile);
  static history$: BehaviorSubject<HistoryVid[]> = new BehaviorSubject([] as HistoryVid[]);

  public sessionDate: number = 0;
  static videoTemp: VideoFile = {
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
  };
  static overlayData$: BehaviorSubject<VideoFile> = new BehaviorSubject(BackendService.videoTemp as VideoFile);
  static playlistVisi$: BehaviorSubject<boolean> = new BehaviorSubject(false as boolean);
  public serveLoad: boolean = false;

  getProfile(): Observable<Profile> {
    return BackendService.profile$;
  }
  getRecords(): Observable<VideoFile[]> {
    return BackendService.records$;
  }
  getHistory(): Observable<HistoryVid[]> {
    return BackendService.history$;
  }
  getOverlayData(): Observable<VideoFile> {
    return BackendService.overlayData$;
  }
  getPlaylistVisi(): Observable<boolean> {
    return BackendService.playlistVisi$;
  }
  setProfile(profile: Profile) {
    BackendService.profile$.next(profile);
  }
  setRecords(records: VideoFile[]) {
    BackendService.records$.next(records);
  }
  setHistory(history: HistoryVid[]) {
    BackendService.history$.next(history);
  }
  setOverlayData(overlayData: VideoFile) {
    BackendService.overlayData$.next(overlayData);
  }
  setPlaylistVisi(playlistVisi: boolean) {
    BackendService.playlistVisi$.next(playlistVisi);
  }

  constructor(private http: HttpClient) { }

  pauseVids() {
    let eleRefs: HTMLCollection = document.getElementsByTagName("video") as HTMLCollection;
    for(let c =0; c < eleRefs.length; c++) (eleRefs[c] as HTMLVideoElement).pause();
  }


  getDataProfile() {
    this.http.get('/profile', {
      responseType: 'text'
    }).subscribe(data => {
      this.sessionDate = Date.now();
      this.setProfile(JSON.parse(data));
      this.getDatafile();
      this.getHistoryfile();
    })
  }
  getDatafile() {
    this.http.get('/datafile', {
      responseType: 'text'
    }).subscribe(data => {
      if(data) this.serveLoad = true;
      this.setRecords(JSON.parse(data));
    })
  }
  getHistoryfile() {
    this.http.get('/historyfile', {
      responseType: 'text'
    }).subscribe(data => {
      if(data) this.serveLoad = true;
      this.setHistory(JSON.parse(data));
    })
  }
  postDatafile(records: VideoFile[]) {
    this.http.post('/datafile', JSON.stringify(records), {'headers': { 'content-type': 'application/json'}})
    .subscribe(data => {
      console.log(data);
    })
  }
  postProfilefile(profile: Profile) {
    this.http.post('/profile', JSON.stringify(profile), {'headers': { 'content-type': 'application/json'}})
    .subscribe(data => {
      console.log(data);
    })
  }
  postHistoryfile(history: HistoryVid[]) {
    this.http.post('/historyfile', JSON.stringify(history), {'headers': { 'content-type': 'application/json'}})
    .subscribe(data => {
      console.log(data);
    })
  }
}
