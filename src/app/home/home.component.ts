import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  formal: boolean = false;
  casual: boolean = false;
  sport: boolean = false;

  FormalHighLight()
  {
    this.casual = true;
    this.sport = true;
  }

  CasualHighLight()
  {
    this.formal = true;
    this.sport = true;
  }

  SportHighLight()
  {
    this.formal = true;
    this.casual = true;
  }

  resetHighlights() {
    this.formal = false;
    this.casual = false;
    this.sport = false;
  }
}
