import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'commentcontent'
})
export class CommentcontentPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return JSON.stringify(JSON.parse(value).content).replace(/['"]+/g, '');
  }

}
