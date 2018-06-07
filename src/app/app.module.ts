import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { RouterModule, Routes } from '@angular/router';

//service here
import { DataService } from "./services/DataService/app.dataService";

//Components here
import { AppComponent } from './app.component';
import { CustomGridComponent } from './components/CustomGridComponent/CustomGridComponent';
import { OrderBy } from "./helpers/orderBy";
import { FilterPipe } from "./helpers/filter";
import { AddFormComponent } from './components/AddFormComponent/AddForm';
import { EmployeesFormComponent } from './components/EmployeesComponent/EmployeesForm';
import { AddData } from './components/AddFormComponent/add-data';


//route configuration here
const routes: Routes = [
  {
    path: '',
    component: EmployeesFormComponent
  },
  {
    path: 'employees',
    component: EmployeesFormComponent
  },

  {
    path: 'employees/add',
    component: AddFormComponent
  },
  {
    path: 'employees/:id/edit',
    component: AddFormComponent
  }


]

@NgModule({
  declarations: [
    AppComponent,
    CustomGridComponent,
    OrderBy,
    FilterPipe,
    AddFormComponent,
    EmployeesFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }