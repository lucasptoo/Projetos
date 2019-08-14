import { UnidadeMedida } from '../enum/unidade-medida.enum';

export class CadastroModel {
    public nomeItem: string;
    public unidadeDeMedida: UnidadeMedida;
    public quantidade: number;
    public preco: number;
    public produtoPerecivel: boolean; 
    public dataDeValidade: Date;
    public dataDeFabricacao: Date;

    public static toModel(json) {
        const model = new CadastroModel();
        Object.assign(model, json);
        return model;
    }
}