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
import { Observable, Subject, switchMap, startWith, map } from 'rxjs';
import { MatMenuModule } from '@angular/material/menu';
import { SortingOption } from '../../models/sorting-option';

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
    DatePipe,
    MatMenuModule
  ],
  providers: [TasksService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private tasksService = inject(TasksService);
  private refreshTasks$ = new Subject<void>();

  public sortingOptions: SortingOption[] = [
    {
      value: 'createdAtAsc',
      viewValue: 'Creation Date Ascending',
      icon: 'arrow_upward'
    },
    {
      value: 'createdAtDesc',
      viewValue: 'Creation Date Descending',
      icon: 'arrow_downward'
    },
    {
      value: 'None',
      viewValue: 'None',
      icon: 'filter_none'
    }
  ];

  private currentSortingOption: SortingOption | null = null;

  public tasks: Observable<Task[]> = this.refreshTasks$.pipe(
    startWith(undefined),
    switchMap(() => this.tasksService.getTasks()),
    map(tasks => {
      if (this.currentSortingOption) {
        switch (this.currentSortingOption.value) {
          case 'createdAtAsc':
            return [...tasks].sort((a, b) => (a.createdAt ? new Date(a.createdAt).getTime() : 0) - (b.createdAt ? new Date(b.createdAt).getTime() : 0));
          case 'createdAtDesc':
            return [...tasks].sort((a, b) => (b.createdAt ? new Date(b.createdAt).getTime() : 0) - (a.createdAt ? new Date(a.createdAt).getTime() : 0));
          default:
            return tasks;
        }
      }

      return tasks;
    })
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

  public sortTasks(option: SortingOption) {
    this.currentSortingOption = option;
    this.refreshTasks$.next();
  }
}
