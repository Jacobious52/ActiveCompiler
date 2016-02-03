import {Injectable} from 'angular2/core';
import {CodeFile} from './codefile';

export interface ErrorUpdateCallback { (errors: string[]): void };

@Injectable()
export class ErrorsService {
    public errors: string[];
    public compiling: boolean = false;

    public onUpdate: ErrorUpdateCallback;

    fetchErrors(files: CodeFile[]) {
        var url = 'http://localhost:5000/build/id/a1687803';
        var body = JSON.stringify({ 'files': files });

        // js scoping trick. because javascript doesnt preserve 'this' like c++
        var that = this;

        var req = new XMLHttpRequest();
        req.open('POST', url, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                var resp: { string: string[] } = JSON.parse(req.responseText);
                that.errors = resp['errors'];
                that.compiling = false;
                if (that.onUpdate) {
                    that.onUpdate(that.errors);
                } else {
                    console.error('update: ErrorUpdateCallback');
                }
            }
        }
        req.send(body);
        this.compiling = true;
        this.errors = [];
        if (this.onUpdate) {
            this.onUpdate(this.errors);
        } else {
            console.error('update: ErrorUpdateCallback not bound to ErrorsComponent');
        }
    }
}