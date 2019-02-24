import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable, of} from 'rxjs';
import {map, switchMap, catchError} from 'rxjs/operators';

import {UsersService} from '../../services/users.service';
import {
  UsersActionTypes,
  GetUsers,
  GetSuccess,
  GetFailure,
  SortUsers,
  RemoveUser,
  RemoveSuccess,
  RemoveFailure,
} from '../actions/users.action';

@Injectable()
export class UsersEffects {
  constructor(private actions$: Actions, private usersService: UsersService) {}

  @Effect()
  getUsers$: Observable<Action> = this.actions$.pipe(
    ofType<GetUsers>(UsersActionTypes.GET_USERS),
    map((action) => action.payload),
    switchMap((payload) => {
      const {sort} = payload;
      return this.usersService.getUsers(sort).pipe(
        map((result) => new GetSuccess({users: [...result]})),
        catchError((error) => of(new GetFailure({error})))
      );
    })
  );

  // @Effect()
  // appendUser$: Observable<Action> = this.actions$.pipe(
  //   ofType<AppendUser>(UsersActionTypes.AppendUser),
  //   map(action => action.payload),
  //   concatMap(payload => {
  //     const {user} = payload;
  //     return this.usersService.pushUser(user).pipe();
  //   })
  // )

  @Effect()
  removeUser$: Observable<Action> = this.actions$.pipe(
    ofType<RemoveUser>(UsersActionTypes.REMOVE_USER),
    map((action) => action.payload),
    switchMap((payload) => {
      const {id} = payload;
      return this.usersService.removeUser(id).pipe(
        map(() => new RemoveSuccess()),
        catchError((error) => of(new RemoveFailure({error})))
      );
    })
  );
}
