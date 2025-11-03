import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe, DatePipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../../services/tasks.service';
import { Observable, Subject, switchMap, startWith } from 'rxjs';

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
    FormsModule,
    AsyncPipe,
    DatePipe
  ],
  providers: [TasksService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private tasksService = inject(TasksService);
  private refreshTasks$ = new Subject<void>();

  public tasks: Observable<Task[]> = this.refreshTasks$.pipe(
    startWith(undefined),
    switchMap(() => this.tasksService.getTasks())
  );

  public taskControl = new FormControl('');

  public toggleTask(task: Task) {
    const updatedTask: Task = { ...task, isDone: !task.isDone };
    this.tasksService.updateTask(updatedTask).subscribe();
  }

  public addTask() {
    const taskTitle = this.taskControl.value?.trim();
    if (taskTitle) {
      const newTask: Task = {
        id: 0, 
        title: taskTitle,
        isDone: false
      };

      this.tasksService.addTask(newTask).subscribe(() => {
        this.taskControl.reset();
        this.refreshTasks$.next();
      });
    }
  }

  public removeTask(id: number) {
    this.tasksService.deleteTask(id).subscribe(() => {
      this.refreshTasks$.next();
    });
  }
}
