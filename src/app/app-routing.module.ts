import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent},
  { path: 'produtos', component: ProdutosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
