/*export interface Cargos{
    id: number
    CARGO: string
}*/

export interface CTE{
    id: number,
    n_cte: number,

}
export class TablectesItem {
    //id: number
    constructor(
        public NR_DACTE: number,
        public REMETENTE: string,
        public DESTINATARIO: string,
        public NR_CONTROLE: string,
        public VALOR: number,
        public VOLUMES: number,
        public NFE: string

    ){}
}
export class Cargos {
    [x: string]: any;
    constructor(
        public id:number,
        public CARGO:string,
        public checked: false
    ){}
    
}

export class Funcionario {
    constructor(
        public id: number,
        public NOME: string,
        public SOBRENOME: string,
        public CARGO: Cargos,
        public SITUACAO: number
    ) { }
}
export interface JWTPayload {
    user_id: number;
    username: string;
    email: string;
    exp: number;
}