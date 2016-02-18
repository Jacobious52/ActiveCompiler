import {Injectable} from 'angular2/core';
import {CodeFile} from './codefile';
import {SERVER_PATH} from './serverpath';

export interface ErrorUpdateCallback { (errors: string[]): void };

@Injectable()
export class ErrorsService {
    public errors: string[];
    public compiling: boolean = false;

    public onUpdate: ErrorUpdateCallback;
    public onError: ErrorUpdateCallback;

    fetchErrors(files: CodeFile[], id: string, problem: string) {
        var url = SERVER_PATH + 'build/id/' + id;
        var body = JSON.stringify({ 'files': files, 'problem': problem });

        // js scoping trick. because javascript doesnt preserve 'this' like c++
        var that = this;

        var req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                var resp: { string: string[] } = JSON.parse(req.responseText);
                that.errors = resp['errors'];

                console.log(that.errors)

                that.compiling = false;

                if (that.onUpdate) {
                    that.onUpdate(that.errors);
                } else {
                    console.error('update: no ErrorUpdateCallback for onUpdate');
                }
            }
        }
        req.onerror = function() {
            that.compiling = false;
            console.error('something went wrong with request to server :(');

            if (that.onError) {
                that.onError([req.statusText])
            } else {
                console.error('update: no ErrorUpdateCallback for onError');
            }
        }
        req.send(body);

        // tell the error component that we are compiling
        this.compiling = true;
        this.errors = [];
        if (this.onUpdate) {
            this.onUpdate(this.errors);
        } else {
            console.error('update: ErrorUpdateCallback not bound to ErrorsComponent');
        }
    }
}
