import { Injectable } from '@angular/core';
import { LocalStorageService } from '../local-storage/local-storage.service';
import { CadastroModel } from 'src/app/shared/models/cadastro';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    public cadastros: CadastroModel[];

    constructor(private localstorage: LocalStorageService) { }

    private getCadastros() {
        this.cadastros = this.localstorage.get('cadastros') ? this.localstorage.get('cadastros') : [];
    }

    public saveCadastro(cadastro: CadastroModel) {
        this.getCadastros();
        this.cadastros.push(cadastro);

        this.localstorage.set(this.cadastros, 'cadastros');
    }

    public deleteCadastro(cadastroNovo: CadastroModel) {
        this.getCadastros();
        this.cadastros = this.cadastros.filter((cadastro: CadastroModel) => {
            if (!this.canDelete(cadastro, cadastroNovo)) {
                return cadastro;
            }
        });
        this.localstorage.set(this.cadastros, 'cadastros');
    }

    private canDelete(cadastro: CadastroModel, cadastroNovo: CadastroModel) {
        let isEqual = true;
        Object.keys(cadastro).map(parm => {
            isEqual = cadastro[parm] !== cadastroNovo[parm] ? false : isEqual;
        });
        return isEqual;
    }
}
