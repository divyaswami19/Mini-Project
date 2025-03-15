import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private firestore: AngularFirestore) {} // ✅ Inject only in constructor

  // ✅ Get all courses
  getCourses(): Observable<any[]> {
    return this.firestore.collection('courses').valueChanges({ idField: 'id' }); 
  }

  // ✅ Add a new course
  addCourse(course: any): Promise<any> {
    const id = this.firestore.createId(); // Generate a unique ID
    return this.firestore.collection('courses').doc(id).set({ id, ...course }) // ✅ Direct Firestore reference
      .then(() => console.log("✅ Course added successfully:", course))
      .catch(error => console.error("❌ Error adding course:", error));
  }
}
