import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Required for *ngFor
import { FormsModule } from '@angular/forms'; // ✅ Required for [(ngModel)]
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule], // ✅ Add FormsModule for [(ngModel)]
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  @Input() courseId: string = ''; // ✅ Initialize to avoid errors
  quizzes: any[] = [];
  userAnswers: any = {};

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    if (this.courseId) {
      this.quizService.getQuizzes(this.courseId).subscribe((quizzes) => {
        this.quizzes = quizzes;
      });
    }
  }

  submitQuiz(): void {
    const userId = 'user123';
    this.quizService.submitQuizAnswers(userId, this.courseId, this.userAnswers).then(() => {
      alert('Quiz Submitted!');
    });
  }
}
