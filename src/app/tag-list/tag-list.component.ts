import { Component, Input, Output, EventEmitter, SimpleChanges, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { VideoFile } from '../customtype';

@Component({
  selector: 'app-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent implements OnInit {

  @Input() tagNameChild = '';
  @Output() tagClose = new EventEmitter<string>();
  ngOnChanges(changes: SimpleChanges) {
    if (changes.tagNameChild && changes.tagNameChild.currentValue && changes.tagNameChild.currentValue.length > 0) {
      for(let c = 0; c < this.records.length; c++) {
        if(this.records[c].tags.indexOf(this.tagNameChild) > -1) {
          this.noVideoFlag = false;
          break;
        }
      }
    }
  }
  overlayData: VideoFile = null as unknown as VideoFile;

  noVideoFlag: boolean = true;
  records: VideoFile[] = [];
  constructor(public Backend: BackendService) { }

  close() {
    this.noVideoFlag = true;
    this.tagNameChild = '';
    this.tagClose.emit("");
  }
  ngOnInit(): void {
    this.Backend.getOverlayData().subscribe(data => {
      this.overlayData = data;
    });
    this.Backend.getRecords().subscribe(rec => {
      this.records = rec;
    });
  }

}
