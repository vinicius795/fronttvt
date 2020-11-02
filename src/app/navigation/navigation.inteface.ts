export interface submenus {
    id: number,
    title: string,
    url: string
}

export interface menus{
    id: number,
    title: string,
    submenus: submenus[],
}