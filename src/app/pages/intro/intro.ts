import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  templateUrl: './intro.html',
  styleUrls: ['./intro.scss']
})
export class Intro implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {
    setTimeout(() => {
      this.router.navigateByUrl('/initial');
    }, 3000);
  }
}
