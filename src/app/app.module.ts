import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SidebarComponent } from './home/sidebar/sidebar.component';
import { TableComponent } from './home/table/table.component';
import { CardComponent } from './card/card.component';
import { HttpClientModule } from '@angular/common/http';
import { PaginationComponent } from './home/table/pagination/pagination.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TypeExtractorPipe } from './type-extractor.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    TableComponent,
    CardComponent,
    PaginationComponent,
    NotFoundComponent,
    TypeExtractorPipe,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
