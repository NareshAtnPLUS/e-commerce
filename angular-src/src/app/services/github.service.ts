import {Injectable} from '@angular/core';
import {map} from 'rxjs/operators';
import { HttpHeaders,HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
interface Profile {
  total_count: number,
  incomplete_results: boolean,
  items: Object[]
}
@Injectable()
export class GithubService{
    private username = 'nareshAtnPLUS';
    private client_id = 'd9308aacf8b204d361fd';
    private client_secret='62551cc02cee983fff0bac41baf170eb5a312c1c';
    
    constructor(
      private http:HttpClient,
      private authService:AuthService
      ){
    }
    
    getUser(userName){
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
        })
      };
      return this.http.get<Profile>('https://api.github.com/search/users?q='+userName, httpOptions)
        
    }
    loadToken() {
      const token = sessionStorage.getItem('id_token');
      this.authService.authToken = token;
    }
    
}