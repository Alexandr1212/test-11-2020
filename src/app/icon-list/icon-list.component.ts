import { Component, OnInit, OnDestroy } from '@angular/core';
import { IconListService } from './icon-list.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ICON_LIST_COLOR_BUTTONS } from './icon-list.buttons';
import { Icon, GroupedIcons } from './icon-list.model';

@Component({
  selector: 'app-icon-list',
  templateUrl: './icon-list.component.html',
  styleUrls: ['./icon-list.component.less'],
})
export class IconListComponent implements OnInit, OnDestroy {
  public searchPhrase = '';
  public selectedSize = '0';
  public showDetails = false;
  public showSpinner = false;
  public groupedIcons = [];
  public colorButtons = ICON_LIST_COLOR_BUTTONS;
  public detailsIcon: Icon;
  public sizes: number[];

  private readonly destroy$ = new Subject<boolean>();

  constructor(private readonly iconListService: IconListService) {}

  public ngOnInit(): void {
    this.iconListService
      .getIconList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((groupedIcons: GroupedIcons[]) => {
        this.sizes = [];

        // Замолняем массив sizes размерами, которые были у тегов <svg>
        groupedIcons.forEach((group) => {
          this.sizes.push(group.width);
        });

        this.groupedIcons = groupedIcons;

        // Один из примеров использования Spinner
        setTimeout(() => {
          this.showSpinner = true;
        }, 1000);
      });
  }

  // Метод для отображения доп. информации конкретной иконки
  public iconDetails(icon: Icon): void {
    this.showDetails = true;
    this.detailsIcon = icon;
  }

  // Метод для закрытия доп. информации конкретной иконки
  public closeDetails(): void {
    this.showDetails = false;
  }

  // Метод для изменения цвета у иконок
  public changeColor(color: string): void {
    this.groupedIcons.forEach((array) => {
      const item = array.icons;

      if (typeof item !== 'undefined') {
        item.forEach((element) => {
          element.svg = this.iconListService.changeColorInSvg(
            element.svg,
            color
          );
        });
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
