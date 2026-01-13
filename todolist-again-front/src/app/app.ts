import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    MatToolbarModule, 
    MatButtonModule, 
    MatProgressSpinnerModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  title = 'todolist-again-front';
  isLoggedIn$ = this.authService.isLoggedIn$;

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
