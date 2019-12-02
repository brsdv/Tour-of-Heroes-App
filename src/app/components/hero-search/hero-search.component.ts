import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Hero } from '../../models/hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.scss']
})
export class HeroSearchComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  private searchTerm = new Subject<string>();

  constructor(private heroService: HeroService) { }

  public search(term: string): void {
    this.searchTerm.next(term); // через метод next() передаются значения в Subject;
  }

  ngOnInit() {
    this.heroes$ = this.searchTerm.pipe(
      debounceTime(300), // оператор(rxjs) если в течении 300мс ничего не произовйдет, выполнение пойдет дальше;
      distinctUntilChanged(), // оператор(rxjs) делающий проверку, запрос отправиться только если новое значение не соответствует предыдущему;
      switchMap((term: string) => this.heroService.searchHeroes(term)) // отписывается от прошлого значения, посколькую оно теряет актуальность и переключается на новое и ждет результатов от него;
    );
  }

}
