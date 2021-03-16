import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit {

  /**
   * user$ {Observable<User>}
   * Can be two different type of User:
   * 1. If the params.id is 0: new User().
   * 2. If the params.id isn't 0: a user from the database based on its id.
   */
  user$: Observable<User> = this.activatedRoute.params.pipe(
    switchMap(params => {
      if (Number(params.id) === 0) {
        return of(new User());
      }

      return this.userService.get(Number(params.id));
    })
  );

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
  }

  // 4. Update 6. Create
  updating: boolean = false;

  onUpdate(form: NgForm, user: User): void {
    this.updating = true;
    if (user.id === 0) {
      this.userService.create(user);
      this.router.navigate(['']);
      this.showSuccess(user)
    } else {
      this.userService.update(user);
      this.router.navigate(['']);
      this.showInfo(user)
    }
  }

  // 5. Validate
  // Template-driven with patterns

  // Toastr
  showSuccess(user: User) {
    this.toastr.success(`${user.name} added successfully`, 'Notice', { timeOut: 3000, easing: 'ease-in', easeTime: 300, tapToDismiss: true });
  }

  showInfo(user: User) {
    this.toastr.info(`${user.name} saved succesfully`, 'Notice', { timeOut: 3000, easing: 'ease-in', easeTime: 300, tapToDismiss: true });
  }
}
