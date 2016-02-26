import {Injectable} from 'angular2/core';
import {SERVER_PATH} from './serverpath';

export interface LoginUpdateCallback { (score: number): void };

@Injectable()
export class UserService {
    public userID: string = '';
    public score: number = 0;

    public onLogin : LoginUpdateCallback;

    login(id: string) {
        this.userID = id;

        // send login to server
        var url = SERVER_PATH + 'login/id/' + this.userID;
        var req = new XMLHttpRequest();
        req.open('GET', url, true);

        var that = this;

        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                var resp: { string: string[] } = JSON.parse(req.responseText);
                that.score = resp['score'];

                if (that.onLogin) {
                    that.onLogin(that.score);
                } else {
                    console.error('OnLoginCallback not bound to ErrorsComponent');
                }
            }
        }
        req.send();
    }

    logout() {
        // send logout to server
        var url = SERVER_PATH + 'logout/id/' + this.userID;
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.send();

        this.userID = 'axxxxxxx';
    }
}
