import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Icon, GroupedIcons } from './icon-list.model';

@Injectable({
  providedIn: 'root',
})
export class IconListService {
  constructor(private readonly httpClient: HttpClient) {}

  // Получение списка сгруппированных по размеру иконок
  public getIconList(): Observable<GroupedIcons[]> {
    return this.httpClient.get('assets/basic_icons.json').pipe(
      map((data) => {
        const iconList = Object.entries(data)
          // Формирование объекта Icon
          .map((item) => this.prepareIcon(item))
          // Фильтруем иконки с width=0
          .filter((icon: Icon) => icon.width > 0)
          // Сортировка по алфавиту
          .sort()
          // Сортировка по размеру
          .sort((icon1: Icon, icon2: Icon) => icon1.width - icon2.width);

        // Группировка иконок по width
        const groupedIcons = this.groupBy(iconList, 'width');

        // Формирование объекта GroupedIcons
        return Object.entries(groupedIcons).map(
          (iconsGroup) =>
            ({
              width: Number(iconsGroup[0]),
              icons: iconsGroup[1],
              opened: true,
            } as GroupedIcons)
        );
      })
    );
  }

  // Метод для изменения цвета (fill) у дочерних элементов тега <svg>
  public changeColorInSvg(svg: string, color: string): string {
    const htmlSvg = this.fromStringToHtml(svg);
    const children = htmlSvg.querySelectorAll('path, circle');

    children.forEach((child) => {
      child.setAttribute('fill', color);
      htmlSvg.append(child);
    });

    return htmlSvg.outerHTML;
  }

  // Метод для превода строки в HTML элемент
  private fromStringToHtml(valueToConvert: string): Element {
    return new DOMParser().parseFromString(valueToConvert, 'text/xml')
      .children[0];
  }

  // Метод для формирование объекта Icon
  private prepareIcon(item: any): Icon {
    const svg = this.fromStringToHtml(item[1]);
    const svgString = this.setWidthAttribute(svg);

    return {
      name: item[0],
      svg: svgString,
      width: Number(svg.getAttribute('width')),
    };
  }

  /*
    Метод для указания размера иконке на сонове атрибутов width
    или viewBox. Если эти атрибуты отсутствуют, значит размер
    будет равен 0 и иконка отображаться не будет
  */
  private setWidthAttribute(element: Element): string {
    let width = parseInt(element.getAttribute('width'), 0);

    if (isNaN(width)) {
      if (element.hasAttribute('viewBox')) {
        width = Number(element.getAttribute('viewBox').split(/\s+|,/)[2]);
      } else {
        width = 0;
      }
    }

    element.setAttribute('width', String(width));

    return element.outerHTML;
  }

  // Метод для группировки иконок по значению
  private groupBy(objectArray, property: string) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(obj);

      return acc;
    }, {});
  }
}
