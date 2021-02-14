
import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let token = localStorage.getItem('Token')       
    
    if(token) {
      const item = JSON.parse(token)
      
      
      const now = new Date();
      if(now.getTime() > item.expiry) {
        localStorage.clear();
        alert('session expired.\nPlease login to continue..')
        location.href = 'login'
        location.reload()
      } else {

        const refreshToken = {
          value : item.value,
          expiry : now.getTime() + (30*60*1000)
        };
        localStorage.setItem('Token', JSON.stringify(refreshToken));
        const cloned = req.clone({
          headers : req.headers.append("token", item.value)
        });
        return next.handle(cloned);
      }
    }
    else 
      return next.handle(req);
  }
}
