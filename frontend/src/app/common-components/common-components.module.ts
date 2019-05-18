import { TopNavComponent } from "./top-nav/top-nav.component";
import { JumbotronComponent } from "./jumbotron/jumbotron.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RouterModule } from "@angular/router";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";


import {
  MatCardModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatDividerModule,
  MatIconModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatSelectModule,
  MatTableModule,
  MatToolbarModule,
  MatMenuModule,
  MatSortModule,
  MatRadioModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatRadioModule
  ],
  declarations: [
    HomeComponent,
    JumbotronComponent,
    NotFoundComponent,
    TopNavComponent
  ],
  exports: [
    HomeComponent,
    JumbotronComponent,
    NotFoundComponent,
    TopNavComponent,
 
    //angular material could also import
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule, 
    MatSortModule, 
    MatMenuModule, 
    RouterModule,
    MatRadioModule
  ]
})
export class CommonComponentsModule {}
