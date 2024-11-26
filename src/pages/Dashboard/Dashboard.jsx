import React from 'react'
import { Box } from '@mui/material'
import { Drawer } from '../../components'
import { Outlet } from 'react-router-dom'

export default function Dashboard() {
    return (
        <Box sx={{ display: 'flex' }}>
            <Drawer />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'gray.main', p:3 }}>
                <Outlet />
            </Box>
        </Box>
    )
}
