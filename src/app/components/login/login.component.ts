import { Component , OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Credenciais } from 'src/app/models/credenciais';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpResponse , HttpInterceptor } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
 
  creds: Credenciais = {
    email: '',
    senha: ''
  } 

  email = new FormControl(null, Validators.email);
  senha = new FormControl(null, Validators.minLength(3));

  constructor(
    private toast: ToastrService,
    private service: AuthService,
    private router: Router) {}
        
    ngOnInit(): void {
    }

//    logar() {
//      this.toast.error(this.creds.email);
//      this.toast.error(this.creds.senha);
//      this.service.authenticate(this.creds).subscribe({
//      next: (resposta: HttpResponse<any>) => {
//          const Authorization = resposta.body?.connection?.replace('Bearer ', '');
//          const token = resposta.body?.token?.replace('Bearer ', '');
//          console.log('Authorization capturado:', Authorization);
//          console.log('Token capturado:', token);
    
//          if (token) { 
//            this.service.successfulLogin(token);
//            this.toast.info('Login realizado com sucesso!');
//            this.router.navigate(['/home']);
//          } else {
//            //this.toast.error(resposta.body.token);
//            this.router.navigate(['/home']);
//            this.toast.error('Falha ao obter o token de autenticação.');
//          }
//        },
//        error: () => {
//          this.toast.error('Usuário e/ou senha inválidos');
//        }
//      });
//    }
        

//    logar() {
//      this.service.authenticate(this.creds).subscribe({
//        next: (resposta: HttpResponse<any>) => {
//          // Aqui, espera-se que o token esteja no corpo da resposta
//          const token = resposta.body?.token; // Captura o token do corpo
//    
//          console.log('Token capturado:', token); // Para depuração
//          if (token) {
//            this.service.successfulLogin(token);
//            this.toast.info('Login realizado com sucesso!');
//            this.router.navigate(['/home']);
//          } else {
//            this.toast.error('Falha ao obter o token de autenticação.');
//          }
//        },
//        error: () => {
//          this.toast.error('Usuário e/ou senha inválidos');
//        }
//      });
//    }
    

    logar() {
      this.service.authenticate(this.creds).subscribe({
        next: resposta => {
          console.log('Resposta completa:', resposta); // Log para verificar a resposta
    
          // Capturando o token do cabeçalho Authorization
          const authorizationHeader = resposta.headers.get('Authorization');
    
          // Verificando se o cabeçalho existe e extraindo o token
          let token: string | null = null;
          if (authorizationHeader) {
            token = authorizationHeader.split(' ')[1]; // Divide e pega a segunda parte (o token)
          }
    
          console.log('Token capturado:', token); // Log do token
    
          if (token) {
            this.service.successfulLogin(token);
            this.toast.info('Login realizado com sucesso!');
            this.router.navigate(['/home']);
          } else {
            this.toast.error('Falha ao obter o token de autenticação.');
          }
        },
        error: () => { 
          console.log('Resposta completa:', this.service.authenticate(this.creds)); // Log para verificar a resposta
          this.toast.error('Usuário e/ou senha inválidos');
        }
      });
    }
    

    //logar() {
    //  this.service.authenticate(this.creds).subscribe({
    //    next: resposta => {
    //      console.log('Resposta completa:', resposta); // Log para ver a resposta
    //
    //      const token = resposta.body?.token || resposta.headers.get('Authorization')?.substring(7);
    //
    //      console.log('Token capturado:', token); // Log do token
    //
    //      if (token) {
    //        this.service.successfulLogin(token);
    //        this.toast.info('Login realizado com sucesso!');
    //        this.router.navigate(['/home']);
    //      } else {
    //        this.toast.error('Falha ao obter o token de autenticação.');
    //      }
    //    },
    //    error: () => { 
    //      this.toast.error('Usuário e/ou senha inválidos');
    //    }
    //  });
    //}
    
//    logar() {
//      this.service.authenticate(this.creds).subscribe({
//        next: resposta => {
//            const token = resposta;
//
//
//          console.log(resposta.status      );
//          console.log('Token:', token);
//          //this.toast.info(token);
//          //if (token && token.split('.').length === 3) {  // Verifique se o token está no formato JWT
//          //  this.service.successfulLogin(token);
//          //  this.toast.info('Login realizado com sucesso!');
//          //  this.router.navigate(['/home']);
//          //} else {
//          //  this.toast.error('Falha ao obter um token JWT válido.');
//          //}
//        },
//        error: () => { 
//          this.toast.error('Usuário e/ou senha inválidos');
//        }
//      });
//    }
        
//    logar(){
//      this.service.authenticate(this.creds).subscribe(resposta => {
//        this.toast.info(resposta.headers.get('authorization'));
//        this.toast.info('Login realizado com sucesso!');
//       ///////   this.router.navigate(['/home']);
//        this.toast.error('Usuário e/ou');
//        //this.service.successfulLogin(resposta.headers.get('Authorization')?.substring(7));
//        this.router.navigate(['/home']);
//      } ,() => { 
//        this.toast.error('Usuário e/ou senha inválidos');
//        //this.router.navigate(['/home']);
//      } )
//    }

  //  logar() {
//      this.service.authenticate(this.creds).subscribe({
    //    next: resposta => {
    //      const token = resposta.headers.get('Authorization');
    //      if (token) {
    //        this.toast.info(token); // Exibe o token ou outra mensagem informativa
    //        this.service.successfulLogin(token.substring(7));
    //        this.router.navigate(['/home']);
    //      } else {
    //        this.toast.error('Falha ao obter o token de autenticação.');
    //      }
    //    },
    //    error: () => { 
    //      this.toast.error('Usuário e/ou senha inválidos');
    //    }
    //  });
    //}

  validaCampos(): boolean {
    return this.email.valid && this.senha.valid 
  }
}