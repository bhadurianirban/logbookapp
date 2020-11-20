import { Injectable, OnDestroy } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { SocketModel, SocketCodeModel } from '../models/sockets.model';
import { ApplicationState } from 'src/app/store/state';
import { Store, select } from '@ngrx/store';
import * as RootActions from '../../store/actions';
import * as fromRoot from '../../store/selectors';
import { environment } from 'src/environments/environment';
import { takeWhile } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class SignalRService implements OnDestroy {
    private hubConnection: HubConnection;
    logbookRequestId: string;
    destroying = false;

    constructor(private store: Store<ApplicationState>,
                private messageService: MessageService) {
        this.store.pipe(select(fromRoot.selectCurrentLogbook),
                takeWhile(() => !this.destroying))
            .subscribe(data => {
                if (data) {
                    this.logbookRequestId = data.RequestId;
                }
            });
    }

    public startConnection = () => {
        this.hubConnection = new HubConnectionBuilder()
            .withUrl(environment.socketURL)
            .build();
        this.hubConnection
            .start()
            .then(() => console.log('Connection started'))
            .catch(err => console.log('Error while starting connection: ' + err));
    }

    public broadcastUpdatedData = (data: SocketModel) => {
        this.hubConnection.invoke('broadCastUpdatedData', data)
            .catch(err => console.error(err));
    }

    public broadcastCreateCode = (data: SocketCodeModel) => {
        this.hubConnection.invoke('broadCastCreateCode', data)
            .catch(err => console.error(err));
    }

    public addUpdateDataListener = () => {
        this.hubConnection.on('updateddata', (data: SocketModel) => {
            // this.updatedData = data;
            if (data.isDashboardUpdated) {
                switch (data.updatedItem) {
                    case 'Outage':
                        this.store.dispatch(new RootActions.GetDashboardOutageAction());
                        break;
                    case 'Tripping':
                        this.store.dispatch(new RootActions.GetDashboardTrippingAction());
                        break;
                    case 'AutoReclose':
                        this.store.dispatch(new RootActions.GetDashboardAutoRecloseAction());
                        break;
                    case 'FirstTimeCharge':
                        this.store.dispatch(new RootActions.GetDashboardFirstTimeChargeAction());
                        break;
                    case 'AntiTheft':
                        this.store.dispatch(new RootActions.GetDashboardAntitheftAction());
                        break;
                    default:
                        this.store.dispatch(new RootActions.GetDashboardShutdownAction());
                        break;
                }
            } else {
                // update logbook based on type and if current logbook is same as logbook getting updated
                if (this.logbookRequestId && this.logbookRequestId === data.logbookId) {
                    switch (data.updatedItem) {
                        case 'Outage':
                            this.store.dispatch(new RootActions.GetLogbookOutageAction({
                                logbookId: data.logbookId,
                                type: data.updatedSubItem
                            }));
                            break;
                        case 'Tripping':
                            this.store.dispatch(new RootActions.GetLogbookTrippingAction({
                                logbookId: data.logbookId,
                                type: data.updatedSubItem
                            }));
                            break;
                        case 'AutoReclose':
                            this.store.dispatch(new RootActions.GetLogbookAutoRecloseAction({
                                logbookId: data.logbookId,
                                type: data.updatedSubItem
                            }));
                            break;
                        case 'FirstTimeCharge':
                            this.store.dispatch(new RootActions.GetLogbookFirstTimeChargeAction({
                                logbookId: data.logbookId,
                                type: data.updatedSubItem
                            }));
                            break;
                        case 'AntiTheft':
                            this.store.dispatch(new RootActions.GetLogbookAntiTheftAction({
                                logbookId: data.logbookId,
                                type: data.updatedSubItem
                            }));
                            break;
                        default:
                            this.store.dispatch(new RootActions.GetLogbookShutdownAction({
                                logbookId: data.logbookId,
                                type: data.updatedSubItem
                            }));
                            break;
                    }
                }
            }
        });
    }

    public CreateCodeListener = () => {
        this.hubConnection.on('createCode', (data: SocketCodeModel) => {
            switch (data.codeForElementType) {
                case 'O':
                    data.codeForElementType = 'Opening';
                    break;
                case 'C':
                    data.codeForElementType = 'Closing';
                    break;
                case 'AO':
                    data.codeForElementType = 'Anti Theft Opening';
                    break;
                case 'AC':
                    data.codeForElementType = 'Anti Theft Closing';
                    break;
                case 'TO':
                    data.codeForElementType = 'Third Party Opening';
                    break;
                case 'TC':
                    data.codeForElementType = 'Third Party Closing';
                    break;
            }
            this.messageService.add(
                { key: 'saveNotification', severity: 'success', summary: data.codeForElementType + ' Code Create',
                 detail: `${data.codeForElementType} Code created successfully with details -
                 Code: ${data.code}, Element: ${data.codeForElement} under ${data.codeType} section.`, closable: true }
              );
        });
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.destroying = true;
      }
}
