import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter_size',
})
export class FilterSizePipe implements PipeTransform {
  public transform(value: any, searchValue): any {
    if (!searchValue || searchValue == 0) return value;
    return value.filter((v) => v.width == searchValue);
  }
}
