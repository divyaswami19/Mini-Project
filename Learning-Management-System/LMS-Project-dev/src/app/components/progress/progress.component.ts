import { Component, Input, OnInit } from '@angular/core';
import { ProgressService } from '../../services/progress.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  @Input() userId!: string;
  @Input() courseId!: string;
  progress: any = {};

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    this.progressService.getProgress(this.userId, this.courseId).subscribe((progress) => {
      this.progress = progress;
    });
  }
}
