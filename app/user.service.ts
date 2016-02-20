import {Injectable} from 'angular2/core';
import {SERVER_PATH} from './serverpath';

@Injectable()
export class UserService {
    public userID: string = 'a1234567';

    login(id: string) {
        this.userID = id;

        // send login to server
        var url = SERVER_PATH + 'login/id/' + this.userID;
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
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
