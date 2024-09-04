import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, debounceTime, delay, filter, finalize, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../../services/api.service';
import { Data } from '../../data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements AfterViewInit{
  searchInput$!: Observable<Event>;
  searchResults: string[] = [];
  loading: boolean =false;
  error!: string | null;
  notFoundMsg: string = ''
  

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private apiService: ApiService){}

// search data
  ngAfterViewInit(): void {

    // access input field using @viewChild
    const inputElement = this.searchInput.nativeElement;

    if(inputElement){
    // create an observable from the search input field
    this.searchInput$ = fromEvent(inputElement, 'keyup');

    this.searchInput$.pipe(
      // use debounce to delay emissions
      debounceTime(300),

      map((evt: Event) => (evt.target as HTMLInputElement).value),


      tap(searchTerm => {
        if (searchTerm.length < 3) {
          this.error = 'Clue: Search term must be at least 3 characters long';
          inputElement.value = ''
          this.searchResults = [];
          this.notFoundMsg = '';
          this.loading = false;
        } else {
          this.error = null;
        }
      }),

      // filter out empty or short terms
      filter(searchTerm => searchTerm.length > 2),

      // show loading indicator
      tap(() => this.loading = true),
      switchMap(searchTerm => this.apiService.simulateApiCall(searchTerm)),
      // error handling
      catchError(err => {
        this.error = 'Failed to fetch data';
        this.loading = false;
        return of([]);
      }),
      tap(() => {
        this.loading = false;
      inputElement.value = ''}),


    )
    // subscribe to get values of observable
    .subscribe(searchResult => {
      this.searchResults = searchResult

      if (searchResult.length === 0) {
        this.notFoundMsg = 'Ha! not my favorite 😂'
      }
      else {
        this.notFoundMsg = ''
      }
   })
    }

  }

 

}
