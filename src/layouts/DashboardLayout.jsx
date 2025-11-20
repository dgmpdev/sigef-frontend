import { Outlet } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

const DashboardLayout = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex' }}>
    <Box
      component="aside"
      sx={{
        width: 240,
        borderRight: '1px solid',
        borderColor: 'divider',
        p: 2,
      }}
    >
      <Typography variant="h6">SIGEF</Typography>
    </Box>
    <Box component="main" sx={{ flex: 1, p: 4 }}>
      <Outlet />
    </Box>
  </Box>
)

export default DashboardLayout

