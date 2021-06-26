export interface submenus {
    id: number,
    title: string,
    url: string
    status?: boolean
}

export interface menus{
    id: number,
    title: string,
    submenus: submenus[],
    status?: boolean
}