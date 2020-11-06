import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconListComponent } from './icon-list/icon-list.component';
import { SanitizeHtmlPipe } from './shared/pipes/sanitize-html.pipe';
import { FilterNamePipe } from './shared/pipes/filter-name.pipe';
import { FilterSizePipe } from './shared/pipes/filter-size.pipe';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IconDetailsComponent } from './icon-list/icon-details/icon-details.component';
import { AccordionComponent } from './shared/accordion/accordion.component';
import { AccordionItemComponent } from './shared/accordion/accordion-item/accordion-item.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    IconListComponent,
    SanitizeHtmlPipe,
    FilterNamePipe,
    FilterSizePipe,
    IconDetailsComponent,
    AccordionComponent,
    AccordionItemComponent,
    SpinnerComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
