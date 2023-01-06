import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})

export class TruncatePipeService implements PipeTransform{

  constructor() { }

  transform(value: string, args: any[]): any {
    const limit = args.length > 0 ? parseInt(args[0], 10) : 20;
    const trail = args.length > 1 ? args [1] : '...';
    return value.length > limit ? value.substring(0, limit) + trail: value;
  }
}
