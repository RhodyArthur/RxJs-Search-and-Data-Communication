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
      const allResults = ['apple🍎', 'banana🍌', 'cherry🍒', 'coconut🥥', 'watermelon🍉', 'grapes🍇', 'orange🍊', 'mango🥭', 'strawberry🍓', 'pineapple🍍'];
      return of(allResults.filter(item => item.toLocaleLowerCase() === searchTerm.toLowerCase()))
      .pipe(delay(500))
  
    }
  

}