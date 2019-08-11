import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import pt from '@angular/common/locales/pt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { SharedModule } from './shared/shared.module';
import { ProdutosComponent } from './pages/produtos/produtos.component';

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    ProdutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [{ provide: NZ_I18N, useValue: pt_BR }],
  bootstrap: [AppComponent]
})
export class AppModule { }
