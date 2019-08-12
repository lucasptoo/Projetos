import { UnidadeMedida } from './../../shared/enum/unidade-medida.enum';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  cadastroForm: FormGroup;
  submitted = false;
  dateFormat = 'dd/MM/yyyy';

  public unidadeMedida = Object.keys(UnidadeMedida).map(key => {
    return { label: UnidadeMedida[key], value: key};
  });

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.cadastroForm = this.formBuilder.group({
      nomeItem: ['', Validators.required],
      unidadeDeMedida: ['', Validators.required],
      quantidade: ['', Validators.required],
      preco: ['', Validators.required],
      produtoPerecivel: ['', Validators.required],
      dataDeValidade: ['', Validators.required],
      dataDeFabricacao: ['', Validators.required]
    });
  }

  get f() {return this.cadastroForm.controls; }

  onSubmit() {
    console.log(this.cadastroForm.value);

    this.submitted = true;
    if (this.cadastroForm.invalid) {
      return;
    }
    console.log('Item cadastrado' + JSON.stringify(this.cadastroForm.value));
  }

  compareDates() {
    if (this.f['dataDeValidade'].value < this.f['dataDeFabricacao'].value) {
      console.log('Produto encontra-se vencido');
    } else {
      console.log('Produto com válidade certa');
    }
  }


  onReset() {
    this.submitted = false;
    this.cadastroForm.reset();
  }
}
