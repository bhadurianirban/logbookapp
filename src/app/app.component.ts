import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { ApplicationState } from './store/state';
import { LoginService } from './login/login.service';
import { Router, RouteConfigLoadStart, RouteConfigLoadEnd } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { takeWhile } from 'rxjs/operators';
import { SignalRService } from './shared/services/signalr.service';
import { UpdateService } from './shared/services/update.service';
import { RefreshShutdownAction } from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'logbook-app';
  loading$: boolean;
  loadingRouteConfig: boolean;
  destroying = false;
  interval: any;
  constructor(private loginService: LoginService,
              private route: Router,
              private permissionsService: NgxPermissionsService,
              private store: Store<ApplicationState>,
              private signalRService: SignalRService,
              private update: UpdateService) {
                this.update.checkForUpdates();
                this.route.events.subscribe(event => {
                  if (event instanceof RouteConfigLoadStart) {
                    this.loadingRouteConfig = true;
                  } else if (event instanceof RouteConfigLoadEnd) {
                    this.loadingRouteConfig = false;
                  }
                });
              }

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addUpdateDataListener();
    this.signalRService.CreateCodeListener();
    this.store.select(x => x.commonStoreData).pipe(
      takeWhile(() => !this.destroying)
    )
    .subscribe(data => {
      if (data) {
        this.loading$ = data.loading;
      }
    });
    if (this.loginService.getLoggedInUser() == null) {
      this.route.navigate(['login']);
    } else {
      const loggedInuser = this.loginService.getLoggedInUser();
      if (loggedInuser.user.Roles[0] === 'ALDC') {
        this.route.navigate(['/aldc-load']);
      }
    }
    this.permissionsService.flushPermissions();
    const loggedInUser = this.loginService.getLoggedInUser();
    if (loggedInUser && loggedInUser.user && loggedInUser.user.Roles) {
      this.permissionsService.loadPermissions(loggedInUser.user.Roles);
    }

    this.interval = setInterval(() => {
      this.store.dispatch(new RefreshShutdownAction({
        logbookId: 'NA', isDashBoardCall: true, isIntervalCall: true
      }));
    }, 600000);
  }

  ngOnDestroy() {
    this.destroying = true;
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
