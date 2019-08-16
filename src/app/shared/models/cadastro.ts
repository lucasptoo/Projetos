import { UnidadeMedida } from '../enum/unidade-medida.enum';

export class CadastroModel {
    public nomeItem: string;
    public unidadeMedida: UnidadeMedida;
    public quantidade: number;
    public preco: number;
    public produtoPerecivel: boolean;
    public dataValidade: Date;
    public dataFabricacao: Date;

    public static toModel(json) {
        const model = new CadastroModel();
        Object.assign(model, json);
        return model;
    }
}
