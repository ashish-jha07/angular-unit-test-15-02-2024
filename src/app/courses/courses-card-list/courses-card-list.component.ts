import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Course} from '../model/course';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {CourseDialogComponent} from '../course-dialog/course-dialog.component';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'courses-card-list',
  templateUrl: './courses-card-list.component.html',
  styleUrls: ['./courses-card-list.component.css']
})
export class CoursesCardListComponent implements OnInit {

  @Input()
  courses: Course[];

  @Output()
  courseEdited = new EventEmitter();

  constructor(private dialog: MatDialog) {
    // console.log("courses", this.courses)
  }

  ngOnInit() {

  }

  ngOnChanges(changes: any): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    // console.log(changes, "changes")
  }
  editCourse(course: Course) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = course;

    const dialogRef = this.dialog.open(CourseDialogComponent, dialogConfig);


    dialogRef.afterClosed()
      .pipe(
        filter(val => !!val),
        tap(() => this.courseEdited.emit())
      )
      .subscribe();

  }

}









