import {Component, OnInit} from 'angular2/core';
import {ErrorsService} from './errors.service';

@Component({
    selector: 'errors',
    template: `
              <h4 *ngIf="_errorsService.compiling">Compiling..</h4>
              <h4 *ngIf="fatal">Error <-> Server: Try again..</h4>
              <div *ngIf="errors">
                <div *ngFor="#error of errors" class="alert alert-danger" role="alert">{{error}}</div>
              </div>
              `
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
