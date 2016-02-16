import {Injectable} from 'angular2/core';

@Injectable()
export class UserService {
    public userID: string = 'axxxxxxx';

    login(id: string) {
        this.userID = id;

        // send login to server
    }

    logout() {
        // send logout to server

        this.userID = 'axxxxxxx';
    }
}
