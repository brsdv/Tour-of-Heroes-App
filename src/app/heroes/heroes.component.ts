import { Component } from '@angular/core';
import { Hero } from '../Models/hero';
import { HEROES } from '../mocks/mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent {
  heroes: Hero[] = HEROES;
  selectedHero: Hero;

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }
}
