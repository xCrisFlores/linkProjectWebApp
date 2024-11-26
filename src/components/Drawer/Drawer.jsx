import { Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material'
import React from 'react'
import { listItems } from './drawerListItems'
import { AccountContainer, LogoContainer, StyledDrawer } from './Drawer.styles'
import { AccountCircle, School, Settings } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

export default function Drawer() {
    const navigate = useNavigate();

    return (
        <StyledDrawer
            variant='permanent'
            anchor="left"
        >
            <LogoContainer>
                <Typography variant='h5'>
                    LinkProject
                </Typography>
                <School />
            </LogoContainer>
            <Divider variant='middle' sx={{ borderBottomColor: 'secondary.light' }} />
            <List sx={{ color: 'primary.main' }}>
                {listItems.map((item, index) => (
                    <ListItem key={index} disablePadding>
                        <ListItemButton
                            onClick={() => navigate(`/dashboard${item.route}`)}
                            sx={{ gap: 1 }}>
                            {item.icon}
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <AccountContainer>
                <AccountCircle />
                <IconButton
                    onClick={() => { }}>
                    <Settings />
                </IconButton>
            </AccountContainer>
        </StyledDrawer>
    )
}
