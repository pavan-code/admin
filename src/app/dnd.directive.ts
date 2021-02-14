
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {
  fileDropped: any;

  constructor() { }
  files : any[] = [];

  @HostListener('class.fileover') fileOver : boolean;

  @HostListener('dragover', ['$event']) 
  onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropogation();
    this.fileOver =  true;
    console.log('drag over')
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropogation();

    console.log('drag leave')
  }

  @HostListener('drop', ['$event'])
  public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropogation();
    this.fileOver = false;
    const files = evt.dataTransfer.files;
    if( files.length > 0) {
      this.fileDropped.emit(files);
      console.log(`you dropped ${files.length} files.`);
      
    }

  }
  
}
