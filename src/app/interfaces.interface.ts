export interface Funcionario {
    id: number,
    NOME: string,
    SOBRENOME: string,
    CARGO: Cargos,
    SITUACAO: number
}

export interface Cargos{
    id: number
}

export interface CTE{
    id: number,
    n_cte: number,

}
export interface TablectesItem {
    id: number
    NR_DACTE: number
    REMETENTE: string
    DESTINATARIO: string
    NR_CONTROLE: string
    VALOR: number
    VOLUMES: number
    NFE: string
}