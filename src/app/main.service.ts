import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private apiUrl = 'http://127.0.0.1:8000/api/login/';
  private apiHeroList = 'http://127.0.0.1:8000/api/herolist/';
  private baseUrl = 'http://127.0.0.1:8000/api/';
  public HEROES: any;
  public httpHeader = new HttpHeaders({'Content-type': 'application/json'});

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = JSON.stringify({ username, password });
    
    // Send login request
    return this.http.post(this.apiUrl, body, { headers });
  }

  handleLogin(response: any) {
    console.log('Login response:', response);  // Log the entire response to debug
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      if (response.is_staff !== undefined) {  // Check if the admin field exists
        localStorage.setItem('is_staff', response.is_staff.toString());  // Store the admin status
      }
      console.log('Token and admin status stored, navigating to home...');
      this.router.navigate(['home']).then(() => {
        console.log('Successfully navigated to home');
        console.log(response.is_staff)
      }).catch((err) => {
        console.error('Navigation error:', err);
      });
    }
  }
  
  
  

  logoutService() {
    // Remove the token from localStorage on logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('admin');
    localStorage.removeItem('token');
    localStorage.removeItem('is_staff');
    this.router.navigate(['login']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');  // Returns true if token exists
}

  
  getHeros(){
    return this.HEROES = this.heroListApi()

  }


  heroListApi(): Observable<any> {
    const token = localStorage.getItem('authToken');  // Retrieve the token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`  // Include token in headers
    });
    
    return this.http.get(this.apiHeroList, { headers });
  }

  // Add hero
  addListName(name: string, image: string, heroDescription: string): Observable<any> {
    let newHero = { name, imageUrl: image,heroDescription };
    const url = `${this.baseUrl}addhero/`;
    return this.http.post(url, newHero, { headers: this.httpHeader });
  }

  // Remove hero from HEROES list
  removeHero(hero: any) {
    this.HEROES = this.HEROES.filter((item: any) => item.id !== hero.id);
  }

  // Update hero
  editList(id: number, updatedHero: any): Observable<any> {
    const url = `${this.baseUrl}heroedit/${id}`;
    return this.http.put(url, updatedHero, { headers: this.httpHeader });
  }

  // Delete hero
  deleteHero(id: number): Observable<any> {
    const url = `${this.baseUrl}heroedit/${id}`;
    return this.http.delete(url, { headers: this.httpHeader });
  }



  getCandidates(): Observable<any> {
    const url =`${this.baseUrl}candidates/`;
    return this.http.get(url, {headers:this.httpHeader});
  }

  createCandidate(candidate: any): Observable<any> {
    const url =`${this.baseUrl}candidates/`;
    return this.http.post<any>(url, candidate, {headers:this.httpHeader});
  }

  updateCandidate(candidate: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}candidateView/${candidate.id}`, candidate);
  }


  deleteCandidate(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}candidateView/${id}`);
  }

signUp(username:string, password:string):Observable <any>{
  let is_staff:boolean= false;
  let newUser={username, password,is_staff}
  const url = `${this.baseUrl}userslist/`
return this.http.post<any>(url,newUser,{ headers: this.httpHeader } )
}

}