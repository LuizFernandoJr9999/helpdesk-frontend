import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{

  constructor(
    private router: Router,
    private authService: AuthService,
    private toast: ToastrService) {}

  ngOnInit(): void {
    this.router.navigate(['home'])    
    //this.router.navigate(['tecnicos'])    
    //this.router.navigate(['chamados'])    
    //this.router.navigate(['chamados/create'])    
    //this.router.navigate(['chamados/update/1'])    
    //this.router.navigate(['chamados/read/1'])    
  }

  logout(){
    this.router.navigate(['login'])
    this.authService.logout();
    this.toast.info("Logout realizado com sucesso", 'logout', {timeOut: 4000})
  }
}
