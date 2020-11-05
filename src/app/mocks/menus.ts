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
        submenus: [submenuslist[0], submenuslist[3]],
    },
    {    
        id: 0,
        title: "Relatorios",
        submenus: [submenuslist[0], submenuslist[1]],
    },
    {
        id: 1,
        title: "Banco de Dados",
        submenus: [submenuslist[2], submenuslist[3]],
    },
    {
        id: 1,
        title: "Ajuda",
        submenus: [submenuslist[2], submenuslist[3]],
    },
]