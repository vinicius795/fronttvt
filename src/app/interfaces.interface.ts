/*export interface Cargos{
    id: number
    CARGO: string
}*/


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
    //id: number
    NR_DACTE: number
    REMETENTE: string
    DESTINATARIO: string
    NR_CONTROLE: string
    VALOR: number
    VOLUMES: number
    NFE: string
}
export class Cargos {
    [x: string]: any;
    constructor(
        public id:number,
        public CARGO:string,
        //public checked: boolean = false,
        public SHOW_RELATORIO: boolean
    ){}
    
}

export interface Funcionario {
    id: number
    NOME: string
    SOBRENOME: string
    CARGO: Cargos
    SITUACAO: number
}
export interface JWTPayload {
    user_id: number;
    username: string;
    email: string;
    exp: number;
}