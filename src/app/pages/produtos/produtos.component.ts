import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { CadastrosModel } from 'src/app/shared/models/cadastros';
import { CadastroModel } from 'src/app/shared/models/cadastro';
import { FormService } from 'src/app/core/services/form/form.service';
import { MessageService } from 'src/app/core/services/message/message.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  public data: CadastroModel[];
  constructor(
    private router: Router,
    private localStorage: LocalStorageService, 
    private formService: FormService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getData();
  }

  private getData() {
    this.data = this.localStorage.get('cadastros');
  }

  public onDelete(cadastro: CadastroModel) {
    this.formService.deleteCadastro(cadastro);
    this.getData();
    this.messageService.successMessage('Produto deletado!');
  }

  public formatDate(date: Date) {
    return date ? moment(date).format('DD/MM/YYYY') : null;
  }

  public getVencido(data: CadastroModel) {
    return moment(data.dataDeValidade).format('DD/MM/YYYY') < moment(new Date()).format('DD/MM/YYYY')
  }

  public onEdit(cadastro: CadastroModel) {
    this.router.navigate(['/cadastro', JSON.stringify(cadastro)]);
  }

}
