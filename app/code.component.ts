import {Component, OnInit, AfterViewChecked} from 'angular2/core';
import {CodeFile} from './codefile'
import {CodeFileService} from './codefile.service';
import {ErrorsService} from './errors.service';
import {UserService} from './user.service';
import {SERVER_PATH} from './serverpath';

// Typescript def for js ace editor
declare var ace: any;

@Component({
    selector: 'code',
    templateUrl: 'app/code.component.html'
})
export class CodeComponent implements OnInit, AfterViewChecked {
    public files: CodeFile[];
    public selectedFile: CodeFile;

    public selectedProblem: string;
    public customProblem: boolean;
    public problems : string[];

    public newFileName: string;

    private _editorLoaded: boolean = false;
    private _loggedQuestionChange : boolean = false;

    private regex = /[\w]+.(cpp|h)/

    constructor(private _codeFileService: CodeFileService,
                private _errorsService : ErrorsService,
                private _userService : UserService) { }

    updateSelectedProblem() {
        if (this.selectedProblem == "99. Custom") {
            this.customProblem = true;
        } else {
            this.customProblem = false;
        }

        console.log('selected: ' + this.selectedProblem);
        this.files = this._codeFileService.getFiles(this.selectedProblem);
        this.selectedFile = this.files[0];

        if (this._editorLoaded) {
            this.setCurrentFile(this.selectedFile);
        }

        // this function gets called twice when changing questions
        // we only want to log it once
        if (this._loggedQuestionChange) {
            var url = SERVER_PATH + 'question/id/' + this._userService.userID + '/q/' + this.selectedProblem;
            var req = new XMLHttpRequest();
            req.open('GET', url, true);
            req.send();
        }
        this._loggedQuestionChange = !this._loggedQuestionChange;
    }

    loadProblems() {
        this._codeFileService.onUpdate = () : void => {
            this.problems = this._codeFileService.getProblems();

            // set the selected problem to the first one
            this.selectedProblem = this.problems[0];

            this.updateSelectedProblem();
        };
        this._codeFileService.fetchProblems(this._userService.userID);
    }

    ngOnInit() {
        this.loadProblems();
    }

    ngAfterViewChecked() {
        // nasty 'hack' to load codeeditor after dom rendered
        if (document.getElementById('editor') && !this._editorLoaded) {
            this._editorLoaded = true;
            var editor = ace.edit("editor");
            editor.$blockScrolling = Infinity;
            editor.setTheme("ace/theme/xcode");
            editor.getSession().setMode("ace/mode/c_cpp");
            document.getElementById('editor').style.fontSize = '14px';

            this.setCurrentFile(this.files[0]);
        }
    }

    getEditor() {
        return ace.edit('editor').getSession();
    }

    setCurrentFile(file: CodeFile) {
        if (!file) {
            this.getEditor().setValue('');
            return;
        }
        this.selectedFile = file;
        this.getEditor().setValue(file.body);
    }

    syncEditorFile() {
        this.selectedFile.body = this.getEditor().getValue();
    }

    onSelect(file: CodeFile) {
        // update code before change
        this.syncEditorFile();

        // goto new selected tabs
        this.setCurrentFile(file);
    }

    newFile() {
        // string undefined
        if (!this.newFileName) {
            this.newFileName = 'new.h';
        }

        // exists but empty with whitespaces
        if (!this.newFileName.trim()) {
            this.newFileName = 'new.h';
        }

        // check to see if filename is safe
        if (!this.regex.test(this.newFileName) || this.newFileName == 'main.cpp') {
            return
        }

        this.files.push({
            'name': this.newFileName, 'body': ''
        });
        this.newFileName = '';

        this.onSelect(this.files[this.files.length-1]);
    }

    deleteFile() {
        if (this.selectedFile.name == 'main.cpp') {
            return;
        }

        var index: number = this.files.indexOf(this.selectedFile, 0);
        if (index != undefined) {
            var newIndex: number = 0;
            if (index != 0) {
                newIndex = index - 1;
            }
            this.files.splice(index, 1);

            this.selectedFile = this.files[newIndex];
            this.setCurrentFile(this.selectedFile);
        }
    }

    compile(file: CodeFile) {
        this.syncEditorFile();
        this._errorsService.fetchErrors(this.files, this._userService.userID, this.selectedProblem);
    }
}
