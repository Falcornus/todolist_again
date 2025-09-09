import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    MatIconModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  removeTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
  public taskControl = new FormControl('');

  public addTask() {
    const taskTitle = this.taskControl.value?.trim();
    if (taskTitle) {
      const newTask: Task = {
        id: this.getNextId(),
        title: taskTitle,
        isDone: false
      };
      this.tasks = [...this.tasks, newTask];
      this.taskControl.reset();
    }
  }

  private getNextId(): number {
    return this.tasks.length > 0 ? Math.max(...this.tasks.map(t => t.id)) + 1 : 1;
  }

  toggleTask(id: number) {
    this.tasks = this.tasks.map(task => {
      if (task.id === id) {
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
