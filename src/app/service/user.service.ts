import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  endpoint: string = 'http://localhost:3000/users';
  userList: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([])

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Get all users from the database.
   * @returns on observable with all users.
   */
  getAll(): void {
    this.http.get<User[]>(`${this.endpoint}`).subscribe(
      list => this.userList.next(list)
    );
  }

  /**
   * Get a specified user from the database by id.
   * @param id {number} user id.
   * @returns an observable with a user object.
   */
  get(id: number): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/${id}`);
  }

  /**
   * Delete a user from the database.
   * The method is: this.http.delete
   */
  remove(user: User): void {
    this.http.delete<User>(`${this.endpoint}/${user.id}`).subscribe(
      () => this.getAll()
    )
  }


  /**
   * Create a user in the database.
   * The method is: this.http.post
   */



  /**
   * Update a user in the database.
   * The method is: this.http.patch
   */
  update(user: User): void {
    this.http.patch<User>(`${this.endpoint}/${user.id}`, user).subscribe(
      () => this.getAll()
    );
  }

}
