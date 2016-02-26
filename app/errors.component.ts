import {Component, OnInit} from 'angular2/core';
import {ErrorsService, Error} from './errors.service';
import {UserService} from './user.service';
import {SERVER_PATH} from './serverpath'

@Component({
    selector: 'errors',
    templateUrl: 'app/errors.component.html'
})
export class ErrorsComponent implements OnInit {
    constructor(private _errorsService: ErrorsService, private _userService: UserService) { }

    public errors: Error[];
    public editDistance: number = 0;
    public score: number = 0;
    public fatal: boolean = false;

    ngOnInit() {
        // callback for errors compiled
        this._errorsService.onUpdate = (errors: Error[], editDistance: number, scoreModifier: number) => {
            this.errors = errors;
            this.editDistance = editDistance;
            this.score += scoreModifier;

            // update student's global score
            this._userService.score = this.score;


            this.fatal = false;
        }
        // callback for errors compiling failed
        this._errorsService.onError = (errors: Error[]) => {
            this.fatal = true;
            this.editDistance = 0;
        }

        // callback for user login with score
        this._userService.onLogin = (score: number) => {
            this.score = score;
        }
    }
}
