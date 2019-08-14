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

  cadastroForm: FormGroup;
  submitted = false;
  dateFormat = 'dd/MM/yyyy';

  stepUnidade = 1;
  formatterUnidade = () => {};
  parserUnidade = () => {};

  formatterReal = (value = 0) => `R$ ${value}`;
  parserReal = (value = '0') => value.replace('R$ ', '');

  public unidadeMedida = Object.keys(UnidadeMedida).map(key => {
    return { label: UnidadeMedida[key], value: key};
  });

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private formService: FormService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.createForm();
    this.getCadastroModel();
  }

  get f() {return this.cadastroForm.controls; }

  private createForm() {
    this.cadastroForm = this.formBuilder.group({
      nomeItem: [{value: undefined, disabled: false}, Validators.compose([Validators.required, Validators.maxLength(50)])],
      unidadeDeMedida: [{value: undefined, disabled: false}, Validators.required],
      quantidade: [{value: undefined, disabled: true}, Validators.required],
      preco: [{value: undefined, disabled: false}, Validators.required],
      produtoPerecivel: [{value: undefined, disabled: false}, Validators.required],
      dataDeValidade: [{value: undefined, disabled: true}, Validators.required],
      dataDeFabricacao: [{value: undefined, disabled: false}, Validators.required]
    });
    this.cadastroForm.get('unidadeDeMedida').valueChanges.subscribe(unidade => {
      this.cadastroForm.get('quantidade').reset({value: undefined, disabled: false});
      if (unidade === this.unidadeMedida[0].value) {
        this.stepUnidade = 0.001;
        this.formatterUnidade = (value = 0) => `${value} lt`;;
        this.parserUnidade = (value = '0') => value.replace('lt ', '');
      } else if (unidade === this.unidadeMedida[1].value) {
        this.stepUnidade = 0.001;
        this.formatterUnidade = (value = 0) => `${value} kg`;;
        this.parserUnidade = (value = '0') => value.replace('kg ', '');
      } else {
        this.stepUnidade = 1;
        this.formatterUnidade = (value = 0) => `${value} un`;;
        this.parserUnidade = (value = '0') => value.replace('un ', '');
      }
    });
    this.cadastroForm.get('produtoPerecivel').valueChanges.subscribe(perecivel => {
      if (perecivel === 'true') {
        this.cadastroForm.get('dataDeValidade').reset({value: undefined, disabled: false});
      } else {
        this.cadastroForm.get('dataDeValidade').reset({value: undefined, disabled: true});
      }
    })
  }

  private getCadastroModel() {
    const url = this.router.url.split('/');
    const params = decodeURI(url[2]);
    if (params !== 'new') {
      const model = CadastroModel.toModel(JSON.parse(params));
      console.log(model);
      
      this.cadastroForm.patchValue(model);
    }
  }

  onSubmit() {
    this.submitted = true;
    if (this.cadastroForm.invalid) {
      return;
    }
    this.formService.saveCadastro(CadastroModel.toModel(this.cadastroForm.value));
    this.cadastroForm.reset();
    this.messageService.successMessage('Produto cadastrado!');
    this.submitted = false;
    this.router.navigate(['produtos']);
  }

  onCancel() {
    this.submitted = false;
    this.cadastroForm.reset();
    this.router.navigate(['produtos']);
  }
}
