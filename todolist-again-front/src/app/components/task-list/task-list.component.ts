import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task } from '../../models/task';

@Component({
  selector: 'app-task-list',
  imports: [],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent { 
  tasks: Task[] = [];
}
