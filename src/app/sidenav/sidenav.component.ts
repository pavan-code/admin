import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginServiceService } from './../../services/login-service.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  scrWidth: number;
  sidebar: string;
  opened: boolean = true;
  hide: boolean = true;
  width: number;

  constructor(private dialog: MatDialog, 
    private loginService : LoginServiceService, 
    private snackbar : MatSnackBar,
    @Inject(DOCUMENT) private document: Document) {
    this.getScreenSize();
   }
   loggedIn: boolean = false
  ngOnInit(): void {
    this.loggedIn = (localStorage.getItem('Token') ? true : false)
    
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    
    
    // this.scrHeight = window.innerHeight;
    this.scrWidth = window.innerWidth;
    // console.log(this.scrWidth);
    if(this.scrWidth <= 768) {
      this.sidebar = 'over'
      this.opened = false;
      this.hide = false;
    }
    else {
      this.sidebar = 'side';
      this.opened = false;      
      this.hide = true
    }
  }

  openSnackbar(message, duration: number) {
    this.snackbar.open(message, 'close', {
      duration: duration,
      verticalPosition : 'top',
      horizontalPosition : 'center'
    })
  }


  logout() {
    // localStorage.removeItem('Token')
    // location.href = '/login'
    this.loginService.adminLogout()
    .subscribe(res => {
      // console.log(res);
      localStorage.clear();
      this.openSnackbar("Logged Out Successfully", 2000)
      location.href = 'login'
      
    })
  }
  

}
