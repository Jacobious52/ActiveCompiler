import {Component} from 'angular2/core';
import {CodeComponent} from './code.component';
import {ErrorsComponent} from './errors.component';
import {CodeFileService} from './codefile.service';
import {ErrorsService} from './errors.service';
import {UserService} from './user.service';

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    directives: [CodeComponent, ErrorsComponent],
    providers: [CodeFileService, ErrorsService, UserService]
})
export class AppComponent {
  public user : string = 'a1234567';
  public validUser: boolean = true;

  private regex = /a\d{7}/;

  constructor(private _userService : UserService) {}

  logout() {
      // log student leaving
      this._userService.logout();

      this.user = '';
      this.validUser = false;

      location.reload();
  }

  checkValid() {
      this.validUser = this.regex.test(this.user)

      // if true, correct user id. log to server
      if (this.validUser) {
          this._userService.login(this.user);
      }
  }
}
