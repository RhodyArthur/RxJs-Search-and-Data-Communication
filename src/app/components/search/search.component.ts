import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { catchError, debounceTime, delay, filter, fromEvent, map, Observable, of, switchMap, tap } from 'rxjs';
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
    // const inputElement = this.searchInput.nativeElement;
    const inputElement = document.getElementById('input-field') as HTMLInputElement

    if(inputElement){
    // create an observable from the search input field
    this.searchInput$ = fromEvent(inputElement, 'input');

    this.searchInput$.pipe(
      // use debounce to delay emissions
      debounceTime(300),

      map((evt: Event) => (evt.target as HTMLInputElement).value),

      // filter out empty or short terms
      filter(searchTerm => searchTerm.length > 2),
      tap(() => this.loading = true),
      switchMap(searchTerm => this.apiService.simulateApiCall(searchTerm)),
      // error handling
      catchError(err => {
        this.error = 'An error occurred!';
        this.loading = false;
        return of([]);
      }),
      tap(() => this.loading = false)
    )
    // subscribe to get values of observable
    .subscribe(searchResult => {
      this.searchResults = searchResult

      if (searchResult.length === 0) {
        this.notFoundMsg = 'Word not Found'
      }
      else {
        this.notFoundMsg = ''
      }
    console.log(searchResult)})
    }

  }

 

}
