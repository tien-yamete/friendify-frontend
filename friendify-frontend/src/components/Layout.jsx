import { useState } from 'react'
import { Box, Drawer, Container } from '@mui/material'
import Header from './Header'
import LeftNav from './LeftNav'
import RightRail from './RightRail'

const DRAWER_WIDTH = 280
const RIGHT_RAIL_WIDTH = 320

export default function Layout({ children, showRightRail = true }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header onMenuClick={handleDrawerToggle} />
      
      <Box sx={{ display: 'flex', flex: 1 }}>
        <Box
          component="nav"
          sx={{
            width: { md: DRAWER_WIDTH },
            flexShrink: { md: 0 },
          }}
        >
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                mt: '64px',
              },
            }}
          >
            <LeftNav />
          </Drawer>

          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': {
                boxSizing: 'border-box',
                width: DRAWER_WIDTH,
                mt: '64px',
                border: 'none',
                position: 'fixed',
                height: 'calc(100vh - 64px)',
                overflowY: 'auto',
              },
            }}
            open
          >
            <LeftNav />
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { md: `calc(100% - ${DRAWER_WIDTH}px - ${showRightRail ? RIGHT_RAIL_WIDTH : 0}px)` },
            ml: { md: `${DRAWER_WIDTH}px` },
            mr: { md: showRightRail ? `${RIGHT_RAIL_WIDTH}px` : 0 },
          }}
        >
          <Container maxWidth="md" sx={{ px: { xs: 0, sm: 2 } }}>
            {children}
          </Container>
        </Box>

        {showRightRail && (
          <Box
            sx={{
              width: { xs: 'none', lg: RIGHT_RAIL_WIDTH },
              flexShrink: { lg: 0 },
              display: { xs: 'none', lg: 'block' },
              position: 'fixed',
              right: 0,
              top: '64px',
              height: 'calc(100vh - 64px)',
              overflowY: 'auto',
              p: 2,
            }}
          >
            <RightRail />
          </Box>
        )}
      </Box>
    </Box>
  )
}
