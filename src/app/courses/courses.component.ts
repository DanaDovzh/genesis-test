import {
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MainService } from 'src/services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Hls from 'hls.js';
import { MatGridList } from '@angular/material/grid-list';
import { CourseInterface, PaginatorInterface } from 'src/utils/types';
import { PageEvent } from '@angular/material/paginator';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.sass'],
})
export class CoursesComponent implements OnInit, AfterViewChecked {
  public courses: CourseInterface[] = [];
  public coursesView: any[] = [];
  public pageSize: number = 5;
  public isHideCourses: boolean = true;
  public columns: number = 2;
  public rowHeight: string = '400px';
  count = 0;

  constructor(private service: MainService, private _snackBar: MatSnackBar) {}

  @ViewChild('box', { static: false }) box?: ElementRef;
  @ViewChild('box', { static: false }) set boxResizeTriggerInit(
    value: ElementRef
  ) {
    if (value) {
      let myBox = document.getElementById('box');
      this.onBoxResize();
      myBox?.addEventListener('onresize', this.onBoxResize);
    }
  }
  ngOnInit(): void {
    this.service.getCourses().subscribe(
      (data: any) => {
        this.courses = data.courses;
        this.coursesView = [...this.courses].slice(0, this.pageSize);
        this.isHideCourses = false;
        this.onResize(window);
      },
      () => {
        this.isHideCourses = false;
        this.openSnackBar('Something went wrong');
      }
    );
  }

  ngAfterViewChecked() {
    if (document.querySelectorAll('video').length === 0) {
      return;
    } else if (this.count === 0) {
      this.count++;
      document.querySelectorAll('video').forEach((video: HTMLVideoElement) => {
        let videoSrc =
          'https://wisey.app/videos/lack-of-motivation-how-to-overcome-it/preview/AppleHLS1/preview.m3u8';
        const hls = new Hls({});
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      });
    }
  }

  changesPaginator(value: PageEvent) {
    console.log(value);

    const fromCut =
      value.pageIndex === 0 ? 0 : value.pageSize * value.pageIndex;
    const toCut =
      value.pageIndex === 0
        ? value.pageSize
        : value.pageSize * (value.pageIndex + 1);
    this.coursesView = [...this.courses].slice(fromCut, toCut);
  }

  onBoxResize() {
    if (this.box) {
      let n = Math.floor(this.box.nativeElement.clientWidth / 100);
      this.columns = n > 0 ? n : 1;
    } else {
      this.columns = 1;
    }
  }

  openSnackBar(message: string, isWrong: boolean = true) {
    this._snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: isWrong ? 'alert' : 'success'
    });
  }

  onResize(data: any) {
    const width = data.innerWidth;
    if(!width) {
      return;
    }
    if (width >= 1000) {
      this.columns = 2;
      this.rowHeight = '400px';
    } else if (width > 770) {
      this.columns = 2;
    } else if (width <= 770) {
      this.columns = 1;
    }
  }
}
