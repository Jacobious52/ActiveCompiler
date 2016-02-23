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

    // TODO: put this into one of the service classes
    loadScore() {
        var url = SERVER_PATH + 'user/id/' + this._userService.userID;

        // js scoping trick. because javascript doesnt preserve 'this' like c++
        var that = this;

        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                var resp: { string: string[] } = JSON.parse(req.responseText);
                that.score = resp['score'];
            }
            req.onerror = function() {
                console.error('something went wrong with request to server :(');
            }
        }
        req.send();
    }

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

        this.loadScore();
    }
}
