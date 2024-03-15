import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Employee } from '../../../core/models/employee.model';
import { EmployeeService } from '../../../core/services/employee.service';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.css',
  providers:[MessageService]
})
export class EmployeeViewComponent {
  employee!: Employee;
  id: any; 

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((res) => {
      let id = res.get("id");
      this.id = id;
      this.getEmployee(id);
    });
  }

  getEmployee(id: any) {
    this.employeeService.getEmployeeById(id).subscribe((res: any) => {   
      this.employee = res;
    });
  }
}
