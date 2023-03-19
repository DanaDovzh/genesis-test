import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { MainService } from 'src/services/main.service';
import Hls from 'hls.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseInterface } from 'src/utils/types';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.sass'],
})
export class CourseComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    public service: MainService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}
  public isHideCourse: boolean = true;
  public course: CourseInterface | undefined;
  linkLesson = '';
  ngOnInit(): void {
    this.route.params
      .pipe(mergeMap((data: any) => this.service.getCourse(data.id)))
      .subscribe(
        (data: any) => {
          this.isHideCourse = false;
          this.course = data;
        },
        () => {
          this.isHideCourse = false;
          this.openSnackBar('Something went wrong');
        }
      );
  }


  convertVideo(link: string) {
    document.querySelectorAll('video').forEach((video: HTMLVideoElement) => {
      const hls = new Hls({});
      hls.loadSource(link);
      hls.attachMedia(video);
    });

  }
  openSnackBar(message: string, isWrong: boolean = true) {
    this._snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: isWrong ? 'alert' : 'success',
    });
  }
}
