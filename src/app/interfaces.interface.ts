
export class SystemSetings {
    id: number
    parametro: string
    valor: string
}

export interface Carg_Func{
    Motorista?: Funcionario[]
}

export interface CTE{
    id: number,
    n_cte: number,

}
export interface TablectesItem {
    id?: number
    NR_DACTE: number
    REMETENTE: string
    DESTINATARIO: string
    NR_CONTROLE: string
    VALOR: number
    VOLUMES: number
    NFE: string
}

export interface Cargos {
    id?:number,
    CARGO:string,
    SHOW_RELATORIO: boolean
    
}

export interface Funcionario{
    id?: Number,
    NOME: String,
    SOBRENOME: String,
    CARGO: [Cargos],
    USUARIO?: Number,
    SITUACAO: boolean
}
export interface JWTPayload {
    user_id: number;
    username: string;
    email: string;
    exp: number;
}

export interface Cars {
    id?: number,
    REFERENCIA: string,
    MODELO: string,
    PLACA: string,
    status: boolean
}