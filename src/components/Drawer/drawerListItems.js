import { Home, FolderShared, History } from '@mui/icons-material'

export const listItems = [{
    label: 'Proyectos',
    icon: <Home/>,
    route: '/projects'
},
{
    label: 'Mi Proyecto',
    icon: <FolderShared/>,
    route: '/my_project'
},
{
    label: 'Solicitudes',
    icon: <History/>,
    route: '/requests',
}]