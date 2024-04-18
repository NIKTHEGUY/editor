import { Component, ViewChild } from '@angular/core';
import { dataModel } from './data.model';
// import { QuillEditorComponent, QuillModule, QuillService } from 'ngx-quill';
// import Quill from 'quill';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'text-editor';
  timer: any;
  initialText = '';
  textArr: dataModel[] = [];
  counter = 1;

  @ViewChild('editor') editor: any;
  quillConfiguration = {
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true,
    },
  };
  onclick() {
    // this.editor.quillEditor.setText('Hello The Guy\n');
    console.log(this.editor.quillEditor.getText(0));
  }
  logChange($event: any) {
    if (this.timer != null) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(() => {
      const strLen = this.editor.quillEditor.getLength();
      this.initialText = this.editor.quillEditor.getText(0, strLen - 1);
      // console.log('inital', this.initialText);
      if (this.textArr.length >= 1) {
        const length = this.textArr.length;
        if (this.textArr[length - 1].data !== this.initialText) {
          this.addData(this.counter, this.initialText);
        }
      } else if (this.textArr.length === 0) {
        this.addData(this.counter, this.initialText);
      }
    }, 2000);
  }

  addData(version: number, dat: string) {
    // console.log(version, dat);
    this.textArr.push({
      version: version,
      data: dat,
      date: new Date(),
    });
    // console.log(this.counter, this.textArr, new Date());
    console.log(this.textArr);
    localStorage.setItem('changes', JSON.stringify(this.textArr));
    this.counter = this.counter + 1;
  }
}
