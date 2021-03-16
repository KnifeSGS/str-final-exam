import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users$: BehaviorSubject<User[]> = this.userService.userList;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.userService.getAll()
  }


  // 1. Delete User
  user: User = new User();
  userDelete(user: User): void {
    this.userService.remove(user)
  }

  confirmDelete(user: User): void {
    this.user = user;
    $('#confirmationDialog').on('shown.bs.modal', function () {
      $('#cancelButton').trigger('focus')
    })
  }

  // 2. Filter
  phrase: string = '';
  searchKey: string = 'name';

  // 3. Sorter
  columnKey: string = 'id';

  onColumnSelect(key: string) {
    this.columnKey = key;
  }

}
