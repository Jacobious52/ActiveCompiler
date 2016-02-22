import {Component, OnInit} from 'angular2/core';
import {ErrorsService, Error} from './errors.service';

@Component({
    selector: 'errors',
    templateUrl: 'app/errors.component.html'
})
export class ErrorsComponent implements OnInit {
    constructor(private _errorsService: ErrorsService) {}

    public errors : Error[];
    public editDistance: number = 0;
    public score: number = 0;
    public fatal: boolean = false;

    ngOnInit() {
        this._errorsService.onUpdate = (errors: Error[], editDistance: number, scoreModifier: number) => {
          this.errors = errors;
          this.editDistance = editDistance;
          this.score += scoreModifier;
          this.fatal = false;
        }
        this._errorsService.onError = (errors: Error[]) => {
            this.fatal = true;
            this.editDistance = 0;
        }
    }
}
