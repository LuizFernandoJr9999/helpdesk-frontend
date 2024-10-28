import { Component , OnInit , ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tecnico } from 'src/app/models/tecnico';
//import { TecnicoService } from 'src/app/services/tecnic.service';
@Component({
  selector: 'app-tecnico-list',
  templateUrl: './tecnico-list.component.html',
  styleUrls: ['./tecnico-list.component.css']
})
export class TecnicoListComponent implements OnInit{
  

  ELEMENT_DATA: Tecnico[] = [
    {
      id: 1,
      nome: 'Valdir Cezar',
      cpf: '009.023.708-04',
      email: 'Valdir@email.com',
      senha: '1234', 
      perfis: ['0'],
      dataCriacao: '15/08/2022' 
    }
  ];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'email', 'acoes'];
  dataSource = new MatTableDataSource<Tecnico>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(    
//    private service: TecnicoService
  ) {}

  ngOnInit(): void { 
  //  this.findAll();
  }

//  findAll() {
//    this.service.findAll().subscribe(resposta => {
//      this.ELEMENT_DATA = resposta 
//      this.dataSource = new MatTableDataSource(resposta);
//      this.dataSource.paginator = this.paginator;
//    })
//  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase(); 
  }


}


