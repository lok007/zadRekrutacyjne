import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit  {


  toppings = new FormControl();
  toppingList: string[] = [];

  maketopping() {
    for (let i=0;i<this.people.length; i++) {
      this.toppingList.push(this.people[i].section)
    }
    for (let j=0; j<this.toppingList.length ; j++) {
      for (let k=0; k<this.toppingList.length ; k++){
        if (this.toppingList[j] === this.toppingList[k] && j!=k) {
          this.toppingList.splice(j,1);
          k=0;
        }
      }
    }
    return this.toppingList;
  }
  
   SectionSalary = [];

  createSectionSalary (){
    for (let i=0; i<this.toppingList.length; i++) {
      this.SectionSalary[i]=0;
      for (let j=0; j<this.people.length; j++) {
        for (let k=0; k<this.toppingList.length; k++) {
        if (i == k && this.toppingList[i]==this.people[j].section){
          this.SectionSalary[k] = this.SectionSalary[k]+this.people[j].salary;
        }
      }
      }
    }
    return this.SectionSalary;
  }

  getTotalCost() {
    return this.people.map(t => t.salary).reduce((acc, value) => acc + value, 0);
  }

  SalaryTable= [];
  createSalaryTable(){
    for (let i=0;i<this.toppingList.length;i++){
      this.SalaryTable[i] = {section: this.toppingList[i],salary: this.SectionSalary[i]}
    }
    return this.SalaryTable
  }

  people = [
    {
      name: 'Jan',
      lastname: 'Kowalski',
      section: 'IT',
      salary: 3000,
      currency: 'PLN'
    },
    {
      name: 'Anna',
      lastname: 'Bąk',
      section: 'Administracja',
      salary: 2400.50,
      currency: 'PLN'
    },
    {
      name: 'Paweł',
      lastname: 'Zabłocki',
      section: 'IT',
      salary: 3300,
      currency: 'PLN'
    },
    {
      name: 'Tomasz',
      lastname: 'Osiecki',
      section: 'Administracja',
      salary: 2100,
      currency: 'PLN'
    },
    {
      name: 'Iwona',
      lastname: 'Leihs-Gutowska',
      section: 'Handlowiec',
      salary: 3100,
      currency: 'PLN'
    }
  ];
  newPerson = {
      name: '',
      lastname: '',
      section: '',
      salary: 0,
      currency: ''
  };
  newName: string ;
  newLastname: string ;
  newSection: string ;
  newSalary: number ;
  newCurrency: string ;

  add(){
    this.newPerson = {
      name: this.newName,
      lastname: this.newLastname,
      section: this.newSection,
      salary: this.newSalary,
      currency: this.newCurrency
     };
     if (this.newPerson.name != undefined && this.newPerson.lastname != undefined &&
      this.newPerson.section != undefined && this.newPerson.salary != undefined && 
      this.newPerson.currency != undefined) {
    console.log(this.newPerson);
    this.people.push(this.newPerson);
    console.log(this.people);
    this.maketopping();
    this.createSectionSalary();
    this.createSalaryTable();
    this.newName = '';
    this.newLastname = '';
    this.newSection = '';
    this.newSalary = undefined;
    this.newCurrency = '';
    }


    
  }


  

  nameFilter = new FormControl('');
  lastnameFilter = new FormControl('');
  sectionFilter = new FormControl('');
  FromSalaryFilter = new FormControl('');
  ToSalaryFilter = new FormControl('');
  currencyFilter = new FormControl('');
  dataSource = new MatTableDataSource();
  columnsToDisplay = ['name', 'lastname', 'section', 'salary', 'currency'];
  filterValues = {
    name: '',
    lastname: '',
    section: '',
    salary: '',
    salary2: '',
    currency: ''
  };

  constructor() {
    this.dataSource.data = this.people;
    this.dataSource.filterPredicate = this.createFilter();
  }

  ngOnInit() {
    this.maketopping();
    this.createSectionSalary();
    this.createSalaryTable();
    console.log(this.toppingList.length);
    console.log(this.people.length);
    console.log (this.toppingList);
    console.log(this.SectionSalary);
    console.log(this.SalaryTable)

    this.nameFilter.valueChanges
      .subscribe(
        name => {
          this.filterValues.name = name;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.lastnameFilter.valueChanges
      .subscribe(
        lastname => {
          this.filterValues.lastname = lastname;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.sectionFilter.valueChanges
      .subscribe(
        section => {
          this.filterValues.section = section;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.FromSalaryFilter.valueChanges
      .subscribe(
        x => {
          this.filterValues.salary = x;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.ToSalaryFilter.valueChanges
      .subscribe(
        salary => {
          this.filterValues.salary2 = salary;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
    this.currencyFilter.valueChanges
      .subscribe(
        currency => {
          this.filterValues.currency = currency;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      )
  }


  createFilter(): (data: any, filter: string) => boolean {
    let filterFunction = function(data, filter): boolean {
      let searchTerms = JSON.parse(filter);
      return data.name.toLowerCase().indexOf(searchTerms.name.toLowerCase()) !== -1
        && data.lastname.toLowerCase().indexOf(searchTerms.lastname.toLowerCase()) !== -1
        && (searchTerms.section.indexOf(data.section) !== -1 || searchTerms.section==0 )
        && searchTerms.salary <= data.salary
        && (data.salary <= searchTerms.salary2 || searchTerms.salary2==0)
        && data.currency.toLowerCase().indexOf(searchTerms.currency.toLowerCase()) !== -1;
    }
    return filterFunction;
  }

}

