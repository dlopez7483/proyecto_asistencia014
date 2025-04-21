const { VITE_SERVER_HOST, VITE_SESSION_AUTH } = import.meta.env

export const config = {
    SERVER_HOST: VITE_SERVER_HOST,
    SESSION_AUTH: VITE_SESSION_AUTH,
}

