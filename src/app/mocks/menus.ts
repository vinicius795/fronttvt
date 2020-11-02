import { menus, submenus } from "../navigation/navigation.inteface"


export const submenuslist: submenus[] = [
    { id: 0, title: "Submenu 1", url: "#" },
    { id: 1, title: "Submenu 2", url: "#" },
    { id: 2, title: "Submenu 3", url: "#" },
    { id: 3, title: "Submenu 4", url: "#" },
]

export const menulist: menus [] = [
    {    
        id: 0,
        title: "Menu 1",
        submenus: [submenuslist[0], submenuslist[1]],
    },
    {
        id: 1,
        title: "Menu 2",
        submenus: [submenuslist[2], submenuslist[3]],
    },
]