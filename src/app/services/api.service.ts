import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { Data } from '../data';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    // Simulate an API call
    simulateApiCall(searchTerm: string): Observable<string[]> {
      const allResults = ['apple', 'banana', 'cherry', 'date', 'fig', 'grape', 'hello'];
      return of(allResults.filter(item => item.toLocaleLowerCase().includes(searchTerm.toLowerCase())))
      .pipe(delay(500))
  
    }
  

}