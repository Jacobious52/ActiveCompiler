import {CodeFile} from './codefile';
import {Injectable} from 'angular2/core';

export interface RequestUpdateCallback { (): void };

@Injectable()
export class CodeFileService {

    public problems : {name:string, files:CodeFile[]}[];
    public loaded: boolean;

    public onUpdate : RequestUpdateCallback;

    fetchProblems(id: string) {
        var url = 'http://localhost:5000/problems/id/' + id;

        // js scoping trick. because javascript doesnt preserve 'this' like c++
        var that = this;

        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = function() {
            if (req.readyState == 4 && req.status == 200) {
                var resp: { problems: {name:string, files:CodeFile[]}[] } = JSON.parse(req.responseText);
                that.problems = resp['problems'];

                that.loaded = true;

                if (that.onUpdate) {
                    that.onUpdate();
                } else {
                    console.error('update: no RequestUpdateCallback for onUpdate');
                }
            }
        }
        req.onerror = function() {
            that.loaded = false;
            console.error('something went wrong with request to server :(');
        }

        req.send();
    }

    getProblems() {
        var probNames = new Array<string>();

        for (var i = 0; i < this.problems.length; ++i) {
            var p = this.problems[i];
            probNames.push(p['name']);
        }
        console.log('problems loaded: ' + probNames.length);

        return probNames;
    }

    getFiles(problemName : string) {
        for (var i = 0; i < this.problems.length; ++i) {
            var p = this.problems[i];
            if (p['name'] == problemName) {
                return p['files'];
            }
        }
    }
}
