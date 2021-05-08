export interface REntregas {
    USUARIO: number,
    VEICULO: number,
    FUNCIONARIOS: Array<{
        FUNCAO: number,
        FUNCIONARIO: number,
    }>
    OBS: string,
    CTE_FPag: Array<{
        CTE: number,
        F_PAGAMENTO: number,
    }>
}
/* export interface Funcionarios{
    id? : Number,
    NOME : String,
    SOBRENOME : String,
    CARGO : [
        {
            id? : Number,
            CARGO : String,
            SHOW_RELATORIO : boolean
        }
    ],
    USUARIO? : null,
    SITUACAO : boolean
} */
/* 
interface func {
    FUNCAO: number,
    FUNCIONARIO: number,
}
interface cte {
    CTE: number,
    F_PAGAMENTO: number,
} */

/*
{
  "USUARIO": 1,
  "VEICULO": 1,
  "FUNCIONARIOS": [{"FUNCAO": 1, "FUNCIONARIO":3}],
  "OBS": "teste",
  "CTE_FPag": [{"CTE": 999, "F_PAGAMENTO": 1}, {"CTE": 998, "F_PAGAMENTO": 2}, {"CTE": 997, "F_PAGAMENTO": 1}]
}
*/