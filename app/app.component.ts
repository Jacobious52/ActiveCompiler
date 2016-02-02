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
  public user : string = "axxxxxx";
}
