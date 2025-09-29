import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class TasksService {
  private httpClient = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getTasks(): Observable<Task[]> {
    return this.httpClient.get<Task[]>(`${this.apiUrl}/tasks`);
  }

  getTask(id: number): Observable<Task> {
    return this.httpClient.get<Task>(`${this.apiUrl}/tasks/${id}`);
  }

  addTask(task: Task): Observable<Task> {
    return this.httpClient.post<Task>(`${this.apiUrl}/tasks`, task);
  }

  updateTask(task: Task): Observable<Task> {
    return this.httpClient.put<Task>(`${this.apiUrl}/tasks/${task.id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/tasks/${id}`);
  }
}
