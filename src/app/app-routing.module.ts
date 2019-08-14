import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';

const routes: Routes = [
  { path: 'cadastro/:param', component: CadastroComponent},
  { path: 'produtos', component: ProdutosComponent},
  { path: '', redirectTo: 'produtos', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
