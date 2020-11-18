import { menus, submenus } from "../navigation/navigation.inteface"


export const submenuslist: submenus[] = [
    { id: 0, title: "Novo Relatório de entregas", url: "#" },
    { id: 1, title: "Reimprimir relatorio", url: "#" },
    { id: 2, title: "Buscar relatorio", url: "#" },
    { id: 3, title: "Gerenciar funcionários", url: "#" },
    { id: 4, title: "Atualizar Banco de dados", url: "#" },
    { id: 5, title: "Carregar XML", url: "#" },
    { id: 6, title: "Gerar arquivo do SSWsistema", url: "#" },
    { id: 7, title: "Gerando relatório de entrega", url: "#" },
]

export const menulist: menus [] = [
    {
        id: 0,
        title: "Minha Conta",
        submenus: [],
    },
    {    
        id: 1,
        title: "Relatorios",
        submenus: [submenuslist[0], submenuslist[1], submenuslist[2]],
    },
    {
        id: 2,
        title: "Banco de Dados",
        submenus: [submenuslist[3], submenuslist[4], submenuslist[5]],
    },
    {
        id: 3,
        title: "Ajuda",
        submenus: [submenuslist[6], submenuslist[7]],
    },
    {
        id: 4,
        title: "Links Uteis",
        submenus: [],
    },
]