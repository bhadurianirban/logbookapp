import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApplicationState } from '../store/state';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { GetLoggedInUserAction } from '../store/actions';
import * as RootActions from '../store/actions/user-auth.actions';
import { takeWhile } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  model: any = {};
  destroying = false;
  constructor(private actions: Actions,
              private store: Store<ApplicationState>,
              private router: Router) { }

  ngOnInit() {
    this.actions.pipe(
      ofType(RootActions.UserAuthActions.GET_LOGGED_IN_USER_SUCCESS),
      takeWhile(() => !this.destroying)
    ).subscribe((action: any) => {
      if (action.payload.Roles && action.payload.Roles.length > 0 && action.payload.Roles[0] === 'ALDC') {
        this.router.navigate([`/aldc-load`]);
      } else {
        this.router.navigate([`/dashboard`]);
      }

    });
  }

  login() {
    this.store.dispatch(new GetLoggedInUserAction({userName: this.model.username, password: this.model.password}));
  }

  ngOnDestroy() {
    this.destroying = true;
  }
}
