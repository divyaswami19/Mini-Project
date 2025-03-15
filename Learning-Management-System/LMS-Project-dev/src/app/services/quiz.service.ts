import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  constructor(private firestore: AngularFirestore) {}

  // Get all quizzes for a course
  getQuizzes(courseId: string): Observable<any[]> {
    return this.firestore
      .collection('quizzes', (ref) => ref.where('courseId', '==', courseId))
      .valueChanges();
  }

  // Submit quiz answers
  submitQuizAnswers(userId: string, quizId: string, answers: any): Promise<void> {
    return this.firestore.collection('submissions').doc(`${userId}-${quizId}`).set({
      answers,
      submittedAt: new Date(),
    });
  }
}

