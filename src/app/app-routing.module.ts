import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';

const routes: Routes = [
  { path: '', component: CoursesComponent, },
  {
    path: 'courses',
    component: CoursesComponent,
    // children: [{ path: 'course/:id', component: CourseComponent }],
  },
  { path: 'course/:id', component: CourseComponent, },
];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule,],
})
export class AppRoutingModule {}
