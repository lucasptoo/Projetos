import { CadastroModel } from './cadastro';

export class CadastrosModel {
    public cadastros: CadastroModel[];

    public static toModel(json) {
        const model = new CadastrosModel();
        Object.assign(model, json);
        return model;
    }
}
