import { Component } from '@angular/core';
import { catchError, combineLatest, delay, finalize, map, of, throwError } from 'rxjs';

@Component({
  selector: 'app-combined',
  standalone: true,
  imports: [],
  templateUrl: './combined.component.html',
  styleUrl: './combined.component.css'
})
export class CombinedComponent {

  combinedData: { user: any; posts: string[] } | null = null;
  loadingUserDetails = true;
  loadingUserPosts = true;
  error: string | null = null;

  ngOnInit() {
    // Simulating user details api endpoint
    const userDetails$ = of({
      id: 1,
      name: 'John Doe',
      email: 'john@doe.com',
    }).pipe(
      delay(1000),
      finalize(() => (this.loadingUserDetails = false)),
      catchError((err) => {
        this.error = 'Failed to fetch user details.';
        return throwError(() => err);
      })
    );

    // Simulating user posts api endpoint
    const userPosts$ = of([
      'Post 1: Why Angular!',
      'Post 2: This is the second post.',
      "Post 3: Let's have some fun",
    ]).pipe(
      delay(1500),
      finalize(() => (this.loadingUserPosts = false)),
      catchError((err) => {
        this.error = 'Failed to fetch user posts.';
        return throwError(() => err);
      })
    );

    // Combine the latest emissions from both observables
    combineLatest([userDetails$, userPosts$])
      .pipe(
        // Transform the combined data into a usable format
        map(([user, posts]) => ({ user, posts }))
      )
      .subscribe((combinedData) => (this.combinedData = combinedData));
  }
}
