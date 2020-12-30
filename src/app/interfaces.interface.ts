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