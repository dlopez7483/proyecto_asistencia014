import './Login.css'

import { Button, Container, Grid2, TextField } from '@mui/material'
import Item from '../../components/Item'

function Login() {
    return (
        <Grid2 container sx={{ padding: '1rem', height: '100vh' }} spacing={1}>
            <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 3 }} sx={{ height: '100%' }}>
                <Item sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <Container sx={{ marginBottom: 'auto', maxHeight: '20%' }}>
                        <img id='logo-dtt' src="/src/assets/logo-ecys-fiusac-min.png" alt="Usac" />
                    </Container>
                    <Container sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <h3>INICIO DE SESIÓN</h3>
                        <TextField
                            required
                            id="usuario"
                            label="Usuario"
                        />
                        <TextField
                            required
                            id="password"
                            label="Password"
                            type="password"
                            placeholder='Contraseña'
                            autoComplete="current-password"
                            sx={{ marginTop: 2 }}
                        />
                        <Button variant="contained" sx={{ marginTop: 2 }}>Iniciar Sesión</Button>
                    </Container>
                </Item>
            </Grid2>
            <Grid2 size={{ xs: 0, sm: 0, md: 8, lg: 9 }} sx={{ height: '100%' }}>
                <img id='foto-usac' src="/src/assets/fiusac01.jpg" alt="Usac Ingenieria" />
            </Grid2>
        </Grid2>
    )
}

export default Login