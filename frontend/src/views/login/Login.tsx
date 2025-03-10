import { useState } from 'react'
import './Login.css'

import { Box, Button, Container, FormControl, Grid2, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import Item from '../../components/Item'
import { Theme } from '../../components/Theme'
import { AppProvider } from '@toolpad/core'

import { config } from '../../config/config'

import axios from 'axios'
import Swal from 'sweetalert2'

function Login() {
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [rol, setRol] = useState(1)

    const login = async () => {
        const data = {
            carne: usuario,
            contrasena: password,
            rol: rol
        }
        try {
            const response = await axios.post(config.SERVER_HOST + '/auth/login', data)
            sessionStorage.setItem('token', response.data.token)
            sessionStorage.setItem('rol', String(data.rol))
            sessionStorage.setItem('usuario', data.carne)
            if (data.rol === 1) {
                window.location.href = '/dashboard-admin'
            } else {
                window.location.href = '/dashboard-tutor'
            }
        } catch {
            Swal.fire({
                title: 'Error al Iniciar sesión!',
                text: 'Verifique sus credenciales',
                icon: 'error',
                confirmButtonText: 'Cerrar'
            })
        }
    }

    return (
        <AppProvider theme={Theme}>
            <Grid2 container sx={{ padding: '1rem', height: '100%' }} spacing={1}>
                <Grid2 size={{ xs: 12, sm: 12, md: 4, lg: 3 }} sx={{ height: '100%' }}>
                    <Item sx={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Container sx={{ marginBottom: 'auto', maxHeight: '20%' }}>
                            <img id='logo-dtt' src="/src/assets/logo-ecys-fiusac-min.png" alt="Usac" />
                        </Container>
                        <Container sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                            <Box sx={{ typography: 'body1', marginBottom: '1rem', color: 'text.primary' }}>INICIO DE SESIÓN</Box>
                            <TextField
                                required
                                id="usuario"
                                label="Usuario"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsuario(e.target.value)}
                            />
                            <TextField
                                required
                                id="password"
                                label="Password"
                                type="password"
                                placeholder='Contraseña'
                                autoComplete="current-password"
                                sx={{ marginTop: 2 }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                            <FormControl sx={{ marginTop: 2 }}>
                                <InputLabel id="selectRol">Rol</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="select"
                                    value={String(rol)}
                                    label="Rol"
                                    onChange={(e: SelectChangeEvent) => setRol(Number(e.target.value))}
                                >
                                    <MenuItem value={1}>Administrador</MenuItem>
                                    <MenuItem value={2}>Tutor</MenuItem>
                                </Select>
                            </FormControl>
                            <Button variant="contained" sx={{ marginTop: 2 }} onClick={login} >Iniciar Sesión</Button>
                        </Container>
                    </Item>
                </Grid2>
                <Grid2 size={{ xs: 0, sm: 0, md: 8, lg: 9 }} sx={{ height: '100%' }}>
                    <img id='foto-usac' src="/src/assets/fiusac01.jpg" alt="Usac Ingenieria" />
                </Grid2>
            </Grid2>
        </AppProvider>
    )
}

export default Login