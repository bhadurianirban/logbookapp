import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { NgxPermissionsService } from 'ngx-permissions';
import { LoginService } from 'src/app/login/login.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.scss']
})
export class SiteHeaderComponent implements OnInit {
  // Sidebar
  visibleSidebar1;
  topmenu: MenuItem[] = [];
  toprightmenu: MenuItem[];

  constructor(private router: Router,
              private permissionsService: NgxPermissionsService,
              private loginService: LoginService) { }

  ngOnInit() {
    // load permissions
    const loggedInUser = this.loginService.getLoggedInUser();
    let user: string = null;
    if (loggedInUser && loggedInUser.user) {
      user = loggedInUser.user.Name;
    }
    const permissions = this.permissionsService.getPermissions();
    this.toprightmenu =
      [
        {
          label: user, styleClass: 'whiteText',
          items: [[
            {
              items: [
                {
                  label: 'Logout', command: (event) => {
                    this.logout();
                  }
                }
              ]
            }
          ]
          ]
        }
      ];
    if (permissions && (permissions.Admin || permissions['Shift InCharge'] || permissions['Shift User']
      || permissions.Employee)) {
      this.topmenu =
        [
          { label: 'Dashboard', styleClass: 'whiteText', routerLink: ['/dashboard'] },
          { label: 'Log Book', styleClass: 'whiteText', routerLink: ['/elogbook'] },
          { label: 'Code Repository', styleClass: 'whiteText', routerLink: ['/code-repository'] },
          {
            label: 'Historic Elements', styleClass: 'whiteText',
            items: [[
              {
                items: [
                  { label: 'Shutdown', routerLink: ['/history/shutdown'] },
                  { label: 'Outage', routerLink: ['/history/outage'] },
                  { label: 'Tripping', routerLink: ['/history/tripping'] },
                  { label: 'Anti Theft', routerLink: ['/history/antitheft'] },
                  { label: 'Auto Reclose', routerLink: ['/history/auto-reclose'] }
                ]
              }
            ]
            ]
          },
          {
            label: 'Reports', styleClass: 'whiteText',
            items: [[
              {
                items: [
                  { label: 'Violation Messages', routerLink: ['/reports/violation-message'] },
                  { label: 'Element Wise Report', routerLink: ['/reports/element-wise'] },
                  { label: 'Tie-Lines Report', routerLink: ['/reports/tie-lines'] },
                ]
              }
            ]
            ]
          },
        ];
    } else if (permissions && (permissions.ALDC)) {
      this.topmenu = [
        { label: 'Load Management', styleClass: 'whiteText', routerLink: ['/aldc-load'] },
      ];
    }
    // check if user has admin access
    if (permissions && permissions.Admin) {
      this.topmenu.push(
        {
          label: 'Duty Roster', styleClass: 'whiteText',
          items: [[
            {
              items: [
                { label: 'Monthly Roster', routerLink: ['/dutyroster/monthly-roster'] },
                { label: 'Employee Shift Summary Report', routerLink: ['/dutyroster/employee-shift-summary-report'] }
              ]
            }
          ]
          ]
        },
        {
          label: 'User management', styleClass: 'whiteText',
          items: [[
            {
              items: [
                { label: 'All users', routerLink: ['/user-manage/usermanagement'] },
                { label: 'Role map', routerLink: ['/user-manage/user-role-map'] }
              ]
            }
          ]
          ]
        },
        {
          label: 'Master Data', styleClass: 'whiteText',
          items: [[
            {
              items: [
                { label: 'Config Values', routerLink: ['/masterdata/config-values'] },
                { label: 'Issue Type', routerLink: ['/masterdata/issue-master'] },
                { label: 'Constituent ', routerLink: ['/masterdata/constituent-master'] },
                { label: 'Violation Type ', routerLink: ['/masterdata/violation'] },
                { label: 'Tripping Nature ', routerLink: ['/masterdata/tripping-nature'] },
                { label: 'Scheduling Type ', routerLink: ['/masterdata/scheduling'] },
                { label: 'Designation Master ', routerLink: ['/masterdata/designation-master'] }
              ]
            }
          ]
          ]
        }
      );
    }
  }

  logout() {
    this.permissionsService.flushPermissions();
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }
}
