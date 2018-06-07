import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core'
import { FormGroup, FormControl, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { AddData } from './add-data'
import { DataService } from '../../services/DataService/app.dataService'
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'add-form',
  templateUrl: './AddForm.html',
  styleUrls: ['./AddForm.css'],
})

export class AddFormComponent {
  public myForm: FormGroup;
  public formdata;
  public submitCheckFlagForEdit: boolean = false;
  id: number;
  params: any;

  constructor(private _fb: FormBuilder, private dataService: DataService, private router: Router, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit() {
    /*form group for form validation*/
    this.myForm = this._fb.group({
      id: ['', [Validators.required]],
      name: ['', [Validators.minLength(4)]],
      phone: ['', [Validators.required]],
      city: ['', [Validators.required]],
      address_line1: ['', [Validators.required]],
      address_line2: ['', [Validators.required]],
      postal_code: ['', [Validators.required]]
    });
/*getting window url for checking if we are in add or edit */
    let url = window.location.href;
    if (url.includes("edit")) {
      this.submitCheckFlagForEdit = true;
      this.params = this.activatedRoute.params.subscribe(params => {
        this.id = +params['id']; 
      });
      let editForm = this.dataService.gridData[0];

      for (let i = 0; i < editForm.length; i++) {
        if (this.id == editForm[i].id) {
          let editFormSelections = {
            id: editForm[i].id, name: editForm[i].name, phone: editForm[i].phone, city: editForm[i].city,
            address_line1: editForm[i].address_line1, address_line2: editForm[i].address_line1, postal_code: editForm[i].postal_code
          };
          (<FormGroup>this.myForm)
            .setValue(editFormSelections, { onlySelf: true });
        }
      }
    }
  }
  /*save data and reflect it on grid*/
  save(data) {
    this.formdata = data;
    this.formdata.edit = 'Edit';
    var phoneNumber = Number(this.formdata.phone);
    //if phone number is not of type number
    if (isNaN(phoneNumber)) {
      this.formdata.phone = 'NA'
    }
    else {
      this.formdata.phone = data.phone;
    }
    //when we are trying to add already added id
    if (this.checkIfIdAlreadyExist(data) && (!this.submitCheckFlagForEdit)) {
      alert("Cant add as this id already exist");

    }
    //when we are editing the data
    else if (this.checkIfIdAlreadyExist(data) && (this.submitCheckFlagForEdit)) {
      for (let i = 0; i < this.dataService.gridData[0].length; i++) {
        if (data.id == this.dataService.gridData[0][i].id) {
          this.dataService.gridData[0][i].id = data.id;
          this.dataService.gridData[0][i].name = data.name;
          this.dataService.gridData[0][i].phone = data.phone;
          this.dataService.gridData[0][i].city = data.city;
          this.dataService.gridData[0][i].address_line1 = data.address_line1;
          this.dataService.gridData[0][i].address_line2 = data.address_line2;
          this.dataService.gridData[0][i].postal_code = data.postal_code;
        }
      }
      alert("Data Edited succssfully click back button to see");
    }
    //adding the data
    else {
      this.dataService.gridData[0].push(this.formdata);
      alert("Data added succssfully click back button to see");
    }
    //clear once done
    let clearFormSelections = {
      id: '', name: '', phone: '', city: '',
      address_line1: '', address_line2: '', postal_code: ''
    };
    (<FormGroup>this.myForm)
      .setValue(clearFormSelections, { onlySelf: true });
  }
  //function to check if id already exist
  checkIfIdAlreadyExist(data) {
    let checkExistingData = this.dataService.gridData[0];
    for (let i = 0; i < checkExistingData.length; i++) {
      if (data.id == checkExistingData[i].id)
        return true;
    }
    console.log(this.dataService.gridData[0]);
  }
  back() {
    this.router.navigate(['employees']);
  }
}

