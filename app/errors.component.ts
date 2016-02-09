import {Component, OnInit} from 'angular2/core';
import {ErrorsService} from './errors.service';

@Component({
    selector: 'errors',
    templateUrl: 'app/errors.component.html'
})
export class ErrorsComponent implements OnInit {
    constructor(private _errorsService: ErrorsService) {}

    public errors : string[];
    public fatal: boolean = false;

    ngOnInit() {
        this._errorsService.onUpdate = (errors : string[]) => {
          this.errors = errors;
          this.fatal = false;
        }
        this._errorsService.onError = (errors: string[]) => {
            this.fatal = true;
        }
    }
}
