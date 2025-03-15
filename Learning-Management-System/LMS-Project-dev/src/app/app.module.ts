import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// ✅ Correct Firebase Imports (for NgModule-based apps)
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

// ✅ Correct Environment Import
import { environment } from '../environments/environment';

// ✅ Non-Standalone Components (Declared)
import { AppComponent } from './app.component';

// ✅ Standalone Components (Imported, NOT Declared)
import { CourseComponent } from './components/course/course.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ProgressComponent } from './components/progress/progress.component';

// ✅ Services
import { CourseService } from './services/course.service';

@NgModule({
  declarations: [
    AppComponent, // ✅ Declare only non-standalone components
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    CommonModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // ✅ Firebase setup
    AngularFireAuthModule, 
    AngularFirestoreModule, 

    // ✅ Import standalone components (DO NOT declare them)
    CourseComponent, // ✅ Works because it's a standalone component
    QuizComponent,
    ProgressComponent,
  ],
  providers: [CourseService], // ✅ Services go here
  bootstrap: [AppComponent]
})
export class AppModule {}
