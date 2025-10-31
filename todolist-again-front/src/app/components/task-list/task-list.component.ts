import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TasksService } from '../../services/tasks.service';
import { Observable } from 'rxjs';

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
    AsyncPipe
  ],
  providers: [TasksService],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  private tasksService = inject(TasksService);

  public tasks: Observable<Task[]> = this.tasksService.getTasks();

  public taskControl = new FormControl('');

  public toggleTask(id: number) {
    // this.localTasks = this.localTasks.map(task => {
    //   if (task.id === id) {
    //     return { ...task, isDone: !task.isDone };
    //   }
    //   return task;
    // });
  }

  public addTask() {
    const taskTitle = this.taskControl.value?.trim();
    if (taskTitle) {
      const newTask: Task = {
        id: 0, // Backend will assign the actual ID
        title: taskTitle,
        isDone: false
      };

      console.log('Adding task:', newTask);
      this.tasksService.addTask(newTask).subscribe(() => {
        this.taskControl.reset();
        // Refresh the tasks list to include the newly added task
        this.tasks = this.tasksService.getTasks();
      });
    }
  }

  public removeTask(id: number) {
    // this.localTasks = this.localTasks.filter(task => task.id !== id);
  }
}
