import { Component } from '@angular/core';
import { DataService } from "../../services/DataService/app.dataService"
import { isNumber } from 'util';


@Component({
    selector: 'employee-form',
    templateUrl: './EmployeesForm.html',
    styleUrls: ['./EmployeesForm.css']
})
export class EmployeesFormComponent {
    title = 'Angular2 Test';


    //CUSTOM GRID
    private Response: any;
    private gridListData: Array<any>;
    private gridListColumnHeaders: Array<any>;
    public createObject: any = {};
    public gridImageUrl;
    constructor(private dataService: DataService) {
    }


    ngOnInit(): void {
        //image url for grid
        this.gridImageUrl = 'assets/images/Lifestyle.png';

        //grid data url 
        let urlString = "./assets/data/TableData.json";

        //get data call for grid data
        this.dataService.getData(urlString).subscribe(Response => {
            this.Response = Response.data;
            this.gridListData = this.Response;
            this.creatingDataObject(this.gridListData);
        });
        //column headers for grid
        this.gridListColumnHeaders = [{
            "columnName": "Id",
            "id": "id",
            "length": "10%",

        }, {
            "columnName": "Name",
            "id": "name",
            "length": "15%",

        }, {
            "columnName": "Phone",
            "id": "phone",
            "length": "15%",

        }, {
            "columnName": "City",
            "id": "city",
            "length": "10%",

        }, {
            "columnName": "Address 1",
            "id": "address_line1",
            "length": "15%",

        }, {
            "columnName": "Address 2",
            "id": "address_line2",
            "length": "15%",

        }, {
            "columnName": "Postal Code",
            "id": "postal_code",
            "length": "10%",

        }, {
            "columnName": "edit",
            "id": "edit",
            "length": "10%",

        }]



    }
    //function to build data in grid
    creatingDataObject(data) {
        var gridData = [];
        //  var reg = new RegExp('^[0-9]+$');
        for (let i = 0; i < data.length; i++) {
            this.createObject = {};
            this.createObject.id = data[i].id;
            this.createObject.name = data[i].name;
            var phoneNumber = Number(data[i].phone)
            if (isNaN(phoneNumber)) {
                this.createObject.phone = 'NA'
            }
            else {
                this.createObject.phone = data[i].phone;

            }
            this.createObject.city = data[i].address.city;
            this.createObject.address_line1 = data[i].address.address_line1;
            this.createObject.address_line2 = data[i].address.address_line2;
            this.createObject.postal_code = data[i].address.postal_code;
            this.createObject.edit = 'Edit';
            gridData.push(this.createObject);
        }
        //pushing data in service so that it should be availble in other components also
        this.dataService.gridData.push(gridData);
    }
    //grid is sorted according to id e.g 1,2,3
    sorting: any = {
        column: 'id',
        descending: false
    };




}
