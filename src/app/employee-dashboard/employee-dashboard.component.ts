import { Component,OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent  implements OnInit{

  formValue !: FormGroup;
  employeeModelObj : EmployeeModel = new EmployeeModel();
  employeeData !: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  constructor(private formbuilder:FormBuilder,
    private api : ApiService){ }

  ngOnInit(): void {
      this.formValue = this.formbuilder.group({
        firstName : [''],
        lastName : [''],
        age : [''],
        gender : [''],
        mobile :['']
      })
      this.getAllEmployee();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd =true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.age = this.formValue.value.age
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.mobile = this.formValue.value.mobile;

    this.api.postEmployee(this.employeeModelObj)
      .subscribe(res=>{
        console.log(res);
        alert("Employee Added Successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      },
      err=>{
        alert("Something went wrong");
      })
  }

  getAllEmployee(){
    this.api.getEmployee()
      .subscribe(res=>{
        this.employeeData = res;
      })
  }

  deleteEmployee(row : any){
    this.api.deleteEmployee(row.id)
      .subscribe(res=>{
        alert("Employee Deleted");
        this.getAllEmployee();
      })
  }

  onEdit(row:any){
    this.showAdd =false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['age'].setValue(row.age)
    this.formValue.controls['gender'].setValue(row.gender)
    this.formValue.controls['mobile'].setValue(row.mobile)

  }

  updateEmployeeDetails(){
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.age = this.formValue.value.age;
    this.employeeModelObj.gender = this.formValue.value.gender;
    this.employeeModelObj.mobile = this.formValue.value.mobile;

    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id as number)
      .subscribe(res=>{
        alert("Updated Successfully");
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      })

  }

}
