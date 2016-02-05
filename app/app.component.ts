import {Component} from 'angular2/core';
import {CodeComponent} from './code.component';
import {ErrorsComponent} from './errors.component';
import {CodeFileService} from './codefile.service';
import {ErrorsService} from './errors.service';

@Component({
    selector: 'app',
    templateUrl: 'app/app.component.html',
    directives: [CodeComponent, ErrorsComponent],
    providers: [CodeFileService, ErrorsService]
})
export class AppComponent {
  public user : string = '';
  public validUser: boolean = false;

  private regex = /a\d{7}/;

  logout() {
      // log student leaving

      this.user = '';
      this.validUser = false;

      location.reload();
  }

  checkValid() {
      this.validUser = this.regex.test(this.user)

      // if true student logged in.. log that
  }
}
