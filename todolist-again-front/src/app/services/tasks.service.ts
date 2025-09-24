import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';

@Injectable()
export class TasksService {
  private httpClient = inject(HttpClient);

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>('/api/tasks');
  }

  getTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`/api/tasks/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>('/api/tasks', task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`/api/tasks/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`/api/tasks/${id}`);
  }
}
