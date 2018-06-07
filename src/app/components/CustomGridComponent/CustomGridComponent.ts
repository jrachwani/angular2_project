import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core'
import { OrderBy } from "../../helpers/orderBy"
import { FilterPipe } from "../../helpers/filter"
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { DataService } from '../../services/DataService/app.dataService';
import { Router } from '@angular/router';
import { GridComponent } from "../../helpers/GridComponent"
@Component({
  selector: 'custom-grid',
  templateUrl: './CustomGrid.html',
  styleUrls: ['./CustomGrid.css'],
})

export class CustomGridComponent extends GridComponent {
  @Input() griddata: any[];
  @Input() search;
  @Input() panel;
  @Input() showheader;
  @Input() customgridcontent
  @Input() sort: any;
  @Input() columnHeaders: any[];
  @Input() headerimgurl;
  product: any[];
  flag: boolean = false;

  stringFilter: string = '';

  constructor(private dataService: DataService, private _fb: FormBuilder, private router: Router) {
    super();

  }
//function for dynamic sorting
  convertSorting(): string {
    return this.sort.descending ? '-' + this.sort.column : this.sort.column;
  }
  //add function for adding employee data
  addEmployeeData() {
    this.flag = true;
    this.router.navigate(['employees/add']);
  }
  
  //edit function for editing employee data
  editEmplyeeData(object, column) {
    if (column == 'edit') {
      this.router.navigate(['employees/'+object.id+'/edit']);
    }
  }
}

