import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { mergeMap } from 'rxjs';
import { MainService } from 'src/services/main.service';
import Hls from 'hls.js';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CourseInterface } from 'src/utils/types';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.sass'],
})
export class CourseComponent implements OnInit {
  constructor(private route: ActivatedRoute, public service: MainService,  private _snackBar: MatSnackBar) {}
  public isHideCourse: boolean = true;
  public course: CourseInterface | undefined;
  
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
          this.openSnackBar('Something went wrong')
        }
      );
  }

  openPictureLesson(lesson: any) {
    console.log(lesson);
    const videoElement = document.createElement('video');
    let videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8'
        const hls = new Hls({});
        videoElement.src = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
        hls.loadSource(videoSrc!);
        hls.attachMedia(videoElement);
        document.body.appendChild(videoElement);
        console.log(videoElement.disablePictureInPicture, document.pictureInPictureEnabled);
        // videoElement.onloadedmetadata = function() {
          videoElement.addEventListener('loadedmetadata', async () => {
            console.log(1);
            // const pip = await videoEle.requestPictureInPicture();
          })
          if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
          } else if (document.pictureInPictureEnabled) {
            videoElement.requestPictureInPicture();
          }
          // You should be able to request the picture in picture API from here
          // Request on my dom element
      // };


        // videoElement.requ/estPictureInPicture()

  }

  openSnackBar(message: string, isWrong: boolean = true) {
    this._snackBar.open(message, 'Close', {
      duration: 6000,
      panelClass: isWrong ? 'alert' : 'success'
    });
  }
}
