import {FILES} from './mock-codefiles';
import {CodeFile} from './codefile';
import {Injectable} from 'angular2/core';


@Injectable()
export class CodeFileService {
  getFiles() {
    return Promise.resolve(FILES);
  }
  addFile(file : CodeFile) {
    FILES.push(file);
  }
}
