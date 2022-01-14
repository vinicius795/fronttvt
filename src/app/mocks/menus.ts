import { menus, submenus } from "../navigation/navigation.inteface"


export const submenuslist: submenus[] = [
    { id: 0, title: "Novo Relatório de entregas", url: "relatorio-entrega/" , status: true},
    { id: 1, title: "Reimprimir relatorio", url: "#" , status: false},
    { id: 2, title: "Buscar relatorio", url: "search/" , status: true},
    { id: 3, title: "Gerenciar funcionários", url: "editfunc/" , status: true},
    { id: 4, title: "Atualizar Banco de dados", url: "atualizar/" , status: true},
    { id: 5, title: "Carregar XML", url: "#" , status: false},
    { id: 6, title: "Gerar arquivo do SSWsistema", url: "#" , status: false},
    { id: 7, title: "Gerando relatório de entrega", url: "#" , status: false},
    { id: 8, title: "Gerenciar Usuarios", url: "users/", status: true},
    { id: 9, title: "Configurações", url:"settings/", status: true},
    { id: 10, title: "CTEs em atraso", url:"delayed/", status: true}
]

export const menulist: menus [] = [
    {
        id: 0,
        title: "Minha Conta",
        submenus: [
            submenuslist[9]
        ],
        status: true,
    },
    {    
        id: 1,
        title: "Relatorios",
        submenus: [
            submenuslist[0], 
            submenuslist[1], 
            submenuslist[2]
        ],
        status: true,
    },
    {
        id: 2,
        title: "Banco de Dados",
        submenus: [
            submenuslist[3], 
            submenuslist[5], 
            submenuslist[8],
            submenuslist[10],
        ],
        status: true,
    },
    {
        id: 3,
        title: "Ajuda",
        submenus: [
            submenuslist[6], 
            submenuslist[7]
        ],
        status: false,
    },
    {
        id: 4,
        title: "Links Uteis",
        submenus: [

        ],
        status: false,
    },
]