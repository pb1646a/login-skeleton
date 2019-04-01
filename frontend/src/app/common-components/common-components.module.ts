import { TopNavComponent } from './top-nav/top-nav.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';
@NgModule({
    imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
    declarations: [HomeComponent, JumbotronComponent, NotFoundComponent, TopNavComponent],
    exports: [HomeComponent, JumbotronComponent, NotFoundComponent, TopNavComponent ]
})


export class CommonComponentsModule {}