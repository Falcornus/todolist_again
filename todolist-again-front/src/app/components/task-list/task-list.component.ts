import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task } from '../../models/task';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-task-list',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatFormField,
    MatInput,
    MatSelectionList,
    MatListOption,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  toggleTask(arg0: number) {
    this.tasks = this.tasks.map(task => {
      if (task.id === arg0) {
        return { ...task, isDone: !task.isDone };
      }
      return task;
    });
  }
  logTaskList() {
    console.log(this.tasks);
  }
  tasks: Task[] = [
    { id: 1, title: 'Task 1', isDone: false },
    { id: 2, title: 'Task 2', isDone: true },
    { id: 3, title: 'Task 3', isDone: false },
  ];
}
