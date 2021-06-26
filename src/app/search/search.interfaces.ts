import { Cargos, Cars, Employee, Fpagamento} from "../interfaces.interface";

export interface ResRel {
    CTE_FPag: [{
        CTE: TablectesItem,
        F_PAGAMENTO: Fpagamento
    }],
    DATA: string,
    FUNCIONARIOS: [{
        FUNCAO: Cargos,
        FUNCIONARIO: Employee
    }],
    OBS: String,
    USUARIO: { id: Number, username: String },
    VEICULO: Cars,
    printable?: boolean
    id?: number
}

export interface ResSearchAny {
    cte: Array<TablectesItem>
    rel?: Array<ResSimpliRel>
}
export interface ResSimpliRel {
    DATA: String
    OBS: String
    USUARIO_id: Number
    VEICULO_id: Number
    id: Number
    printable: Boolean

}
interface TablectesItem {
    id?: number
    NR_DACTE: string
    REMETENTE: string
    DESTINATARIO: string
    NR_CONTROLE: string
    VALOR: string
    VOLUMES: string
    NFE: string
}