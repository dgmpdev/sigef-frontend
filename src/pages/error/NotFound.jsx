import { Box, Button, Typography } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const NotFound = () => (
  <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', gap: 2 }}>
    <Typography variant="h2">404</Typography>
    <Typography variant="h5" color="text.secondary">
      Oups, page introuvable
    </Typography>
    <Button component={RouterLink} to="/" variant="contained">
      Retour à l’accueil
    </Button>
  </Box>
)

export default NotFound

