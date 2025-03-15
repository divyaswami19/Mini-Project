import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../services/course.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [FormsModule, CommonModule, AngularFirestoreModule], // Firestore module imported here
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  courses: any[] = [];
  courseTitle: string = '';
  courseDescription: string = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((courses) => {
      this.courses = courses;
    });
  }

  addCourse(): void {
    const newCourse = {
      title: this.courseTitle,
      description: this.courseDescription,
      createdAt: new Date(),
    };

    this.courseService.addCourse(newCourse).then(() => {
      this.courseTitle = '';
      this.courseDescription = '';
    }).catch(error => {
      console.error("Error adding course:", error);
    });
  }
}
