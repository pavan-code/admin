import { NavigationStart, Router } from '@angular/router';

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router: Router) {}
  title = 'Khan-Coppers-Admin-Frontend';

  ngOnInit(): void {
    // if(!this.loginService.loggedIn()) {
    //   localStorage.clear();
    // }
    this.router.events.subscribe(event => {
      if(event instanceof NavigationStart) {
        document.getElementById("top").scrollIntoView();
      }
    })

  }
}
