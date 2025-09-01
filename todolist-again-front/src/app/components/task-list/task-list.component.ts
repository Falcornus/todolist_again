import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Task } from '../../models/task';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatListOption, MatSelectionList } from '@angular/material/list';

@Component({
  selector: 'app-task-list',
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, MatFormField, MatInput, MatSelectionList, MatListOption],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskListComponent {
  tasks: Task[] = [];
}
