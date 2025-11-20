import { Box, Typography } from '@mui/material'

const ForgotPassword = () => (
  <Box sx={{ p: 4 }}>
    <Typography variant="h4">Mot de passe oublié</Typography>
    <Typography variant="body1" color="text.secondary">
      Zone pour déclencher la procédure de réinitialisation.
    </Typography>
  </Box>
)

export default ForgotPassword

