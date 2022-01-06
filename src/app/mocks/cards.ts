import { Card } from "../cards/cards.interface";

export const cardlist: Card[] = [
    { 
        id: 0, 
        name: "Relatorio", 
        description: "Emissão de relatorios de viagem", 
        url:"../relatorio-entrega", 
        state: true 
    },
    // { id: 1, name: "Atualizacao", description: "Atualiza banco de dados com os dados das empresas parceiras", url:"../atualizar", state: true },
    { 
        id: 2, 
        name: "Gerenciar Funcionarios", 
        description: "Adiciona/ Gerencia Funcionarios, Caminhoes e Cargo", 
        url:"../editfunc", 
        state: true
    },
    {
        id: 10,
        description: "Buscar cte, nota fiscal, relatorio por data",
        name: "Buscar",
        state: true,
        url: "../search"
    },
    /* {
        id:0,
        description: "",
        name: "Conhecimentos em aberto",
        state: false,
        url:"../#"

    } */

];