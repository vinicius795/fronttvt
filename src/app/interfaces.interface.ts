/*export interface Cargos{
    id: number
    CARGO: string
}*/

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