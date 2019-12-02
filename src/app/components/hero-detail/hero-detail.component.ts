import { Component, OnInit } from '@angular/core';
import { Hero } from '../../models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent {
  hero: Hero;  

  constructor(private activateRoute: ActivatedRoute, private location: Location, private heroService: HeroService) {};

  ngOnInit() {
    this.getHero();
  }

  getHero(): void {
    const id = +this.activateRoute.snapshot.paramMap.get('id');

    this.heroService.getHero(id).subscribe(hero => {
      this.hero = hero;
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }
}
