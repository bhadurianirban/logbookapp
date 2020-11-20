import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ConfirmationService } from 'primeng/api';
import { interval } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private swUpdate: SwUpdate,
              private confirmationService: ConfirmationService) {
      if (!this.swUpdate.isEnabled) {
        console.log('Service worked not enabled 🙁');
      }
      if (this.swUpdate.isEnabled) {
        interval(6 * 60 * 60).subscribe(() => swUpdate.checkForUpdate()
          .then(() => console.log('checking for updates')));
      }
   }

   public checkForUpdates(): void {
    this.swUpdate.available.subscribe(event => this.promptUser());
  }

  private promptUser(): void {
    console.log('updating to new version');
    this.swUpdate.activateUpdate().then(() =>
    this.confirmationService.confirm({
      header: 'Update Available!!',
      message: 'New version of the application is published. Do you want to refresh the app to get latest features?',
      accept: () => {
        window.location.reload();
      }
  }));
  }
}
