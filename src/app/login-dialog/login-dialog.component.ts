import { LoginServiceService } from './../../services/login-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, private loginService : LoginServiceService, private snackbar : MatSnackBar) {

    let token = localStorage.getItem('Token');       
    if(token) {
        localStorage.clear();
        location.href = 'login';
        location.reload();
            }
}

  login : FormGroup;
  show = false;

  ngOnInit(): void {
    this.createForm();

  }
  createForm(): void {
    this.login = this.fb.group({
      username : ['', [Validators.required]],
      password : ['', [Validators.required]]
    });
    this.login.valueChanges.subscribe(data => this.onValueChanged(data));
  }
  formErrors = {
    'username' : '',
    'password' : ''
  }
  validationMsgs = {
    'username' : {
      'required' : "Username required"
    },
    'password' : {
      'required' : "Password is required"
    }
  }
  onValueChanged(data? : any) {
    if (!this.login) { return; }
    const form = this.login;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMsgs[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }

  openSnackbar(message: string, duration: number) {
    this.snackbar.open(message, 'close', {
      duration: duration,
      verticalPosition : 'top',
      horizontalPosition : 'center'
    })
  }
  Login() {
      // this.login.reset()
      this.show = true;
      this.loginService.adminLogin(this.login.value)
      .subscribe(res => {
        this.show = false;
        // console.log('data from server: ', res);
        if(res.status == 5 || res.status == 2) {
          this.openSnackbar(res.message, 2000);
          this.login.reset();
        }
        if(res.status == 0) {
          this.login.reset();
          this.openSnackbar(res.message, 1500);
          const now = new Date()
          const item = {
            value : res.data.token,
            expiry : now.getTime() + (30*60*1000)
          }
          localStorage.setItem('Token', JSON.stringify(item));
          location.href = 'home/dashboard';
        }

      }, err => {
        this.show = false;
        // this.openSnackbar("Unknown error has occurred on the server side. Try again after few seconds.", 5000);
        // console.log('err: ', err)
      })
  }

}
