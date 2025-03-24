import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight'
})
export class HighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}
  // transform(value: unknown, searchString: string): unknown {
  //   return null;
  // }

  transform(value: string, searchString: string): SafeHtml {
    if (!searchString) return value;
    
    const regex = new RegExp(searchString, 'gi');
    const highlighted = value.replace(regex, match =>
      `<mark>${match}</mark>`);
    
    return this.sanitizer.bypassSecurityTrustHtml(highlighted);
  }
}
