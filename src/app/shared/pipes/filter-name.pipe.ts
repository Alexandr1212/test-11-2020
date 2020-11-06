import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter_name',
})
export class FilterNamePipe implements PipeTransform {
  public transform(value: any, searchValue): any {
    if (!searchValue) return value;
    return value.filter(
      (v) => v.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
    );
  }
}
