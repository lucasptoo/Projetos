import { LocalStorageService } from 'src/app/core/services/local-storage/local-storage.service';
import { UnidadeMedida } from './../../shared/enum/unidade-medida.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormService } from 'src/app/core/services/form/form.service';
import { CadastroModel } from 'src/app/shared/models/cadastro';
import { MessageService } from 'src/app/core/services/message/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private localStorage: LocalStorageService,
    private messageService: MessageService
  ) { }

  get f() {return this.cadastroForm.controls; }

  public cadastroForm: FormGroup;
  public submitted = false;
  public dateFormat = 'dd/MM/yyyy';
  public oldRegister: any;
  public data: CadastroModel[];
  public stepUnidade = 1;
  public unidadeMedida = Object.keys(UnidadeMedida).map(key => {
    return { label: UnidadeMedida[key], value: key};
  });

  public formatterUnidade = () => {};
  public parserUnidade = () => {};

  public formatterReal = (value = 0) => `R$ ${value}`;
  public parserReal = (value = '0') => value.replace('R$ ', '');

  ngOnInit() {
    this.createForm();
    this.getCadastroModel();
  }

  private createForm() {
    this.cadastroForm = this.formBuilder.group({
      nomeItem: [{value: undefined, disabled: false}, Validators.compose([Validators.required, Validators.maxLength(50)])],
      unidadeMedida: [{value: undefined, disabled: false}, Validators.required],
      quantidade: [{value: undefined, disabled: true}, Validators.required],
      preco: [{value: undefined, disabled: false}, Validators.required],
      produtoPerecivel: [{value: undefined, disabled: false}, Validators.required],
      dataValidade: [{value: undefined, disabled: true}, Validators.required],
      dataFabricacao: [{value: undefined, disabled: false}, Validators.required]
    });

    this.changeValueUnidadeMedida();
    this.checkPerishableField();

  }

  private checkPerishableField() {
    this.cadastroForm.get('produtoPerecivel').valueChanges.subscribe(perecivel => {
      if (perecivel === 'true') {
        this.cadastroForm.get('dataValidade').reset({value: undefined, disabled: false});
      } else {
        this.cadastroForm.get('dataValidade').reset({value: undefined, disabled: true});
      }
    });
  }

  private changeValueUnidadeMedida() {
    this.cadastroForm.get('unidadeMedida').valueChanges.subscribe(unidade => {
      this.cadastroForm.get('quantidade').reset({value: undefined, disabled: false});
      if (unidade === this.unidadeMedida[0].value) {
        this.stepUnidade = 0.001;
        this.formatterUnidade = (value = 0) => `${value} lt`;
        this.parserUnidade = (value = '0') => value.replace('lt ', '');
      } else if (unidade === this.unidadeMedida[1].value) {
        this.stepUnidade = 0.001;
        this.formatterUnidade = (value = 0) => `${value} kg`;
        this.parserUnidade = (value = '0') => value.replace('kg ', '');
      } else {
        this.stepUnidade = 1;
        this.formatterUnidade = (value = 0) => `${value} un`;
        this.parserUnidade = (value = '0') => value.replace('un ', '');
      }
    });
  }

  private getCadastroModel() {
    const url = this.router.url.split('/');
    const params = decodeURI(url[2]);
    if (params !== 'new') {
      const model = CadastroModel.toModel(JSON.parse(params));
      this.cadastroForm.patchValue(model);
      this.oldRegister = model;

      this.data = this.localStorage.get('cadastros');

    }
  }

  changeValueProduct(oldRegister) {

    this.formService.deleteCadastro(oldRegister);
  }


  onSubmit() {
    this.submitted = true;
    if (this.cadastroForm.invalid) {
      return;
    }

    const url = this.router.url.split('/');
    const params = decodeURI(url[2]);
    if (params !== 'new') {
      this.changeValueProduct(this.oldRegister);
      this.messageService.successMessage('Produto alterado!');
    }
    this.formService.saveCadastro(CadastroModel.toModel(this.cadastroForm.value));
    this.cadastroForm.reset();
    this.submitted = false;
    this.router.navigate(['produtos']);
    if ( params === 'new') {
      this.messageService.successMessage('Produto cadastrado!');
    }

  }

  onCancel() {
    this.submitted = false;
    this.cadastroForm.reset();
    this.router.navigate(['produtos']);
  }
}
