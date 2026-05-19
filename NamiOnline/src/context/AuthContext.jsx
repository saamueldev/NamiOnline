import { createContext, useEffect, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

// Hugo - Função lembre-me
function getStoredToken() {
  return (
    localStorage.getItem('nami_token') ||
    sessionStorage.getItem('nami_token')
  )
}

function getStoredUser() {
  const savedUser =
    localStorage.getItem('nami_user') ||
    sessionStorage.getItem('nami_user')

  return savedUser ? JSON.parse(savedUser) : null
}

function limparStoragesSessao() {
  localStorage.removeItem('nami_user')
  localStorage.removeItem('nami_token')

  sessionStorage.removeItem('nami_user')
  sessionStorage.removeItem('nami_token')
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => getStoredUser())
  const [authLoading, setAuthLoading] = useState(() => Boolean(getStoredToken()))

  // Hugo - Alteração nos parâmetros para fazer o Lembre-me
  const salvarSessao = (usuarioApi, token = getStoredToken(), lembrarMe = true) => {
    const commonUser = {
      id: usuarioApi._id,
      nome: usuarioApi.name,
      email: usuarioApi.email,
      cpf: usuarioApi.cpf,
      tipo: usuarioApi.tipo || 'usuario',
      avatar: usuarioApi.tipo === 'admin' ? 'ADM' : 'USER'
    }

    const storage = lembrarMe ? localStorage : sessionStorage

    limparStoragesSessao()

    setUser(commonUser)
    storage.setItem('nami_user', JSON.stringify(commonUser))

    if (token) {
      storage.setItem('nami_token', token)
    }

    return commonUser
  }

  const logout = () => {
    setUser(null)
    limparStoragesSessao()
  }

  useEffect(() => {
    async function validarSessao() {
      const token = getStoredToken()
      const lembrarMe = Boolean(localStorage.getItem('nami_token'))

      if (!token) {
        setAuthLoading(false)
        return
      }

      try {
        const response = await api.get('/usuarios/me')
        salvarSessao(response.data, token, lembrarMe)
      } catch (error) {
        logout()
      } finally {
        setAuthLoading(false)
      }
    }

    validarSessao()
  }, [])

  const login = async (identificador, senha, lembrarMe = true) => {
    const response = await api.post('/usuarios/login', {
      identificador,
      password: senha
    })

    const usuarioApi = response.data.user
    const token = response.data.token
    const commonUser = salvarSessao(usuarioApi, token, lembrarMe)

    return { sucesso: true, tipo: commonUser.tipo, user: commonUser }
  }

  const isAdmin = () => user?.tipo === 'admin'
  const isLoggedIn = () => user !== null && Boolean(getStoredToken())

  return (
    <AuthContext.Provider value={{ user, authLoading, login, logout, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}