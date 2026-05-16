import { createContext, useEffect, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('nami_user')
    return savedUser ? JSON.parse(savedUser) : null
  })
  const [authLoading, setAuthLoading] = useState(() => Boolean(localStorage.getItem('nami_token')))

  const salvarSessao = (usuarioApi, token = localStorage.getItem('nami_token')) => {
    const commonUser = {
      id: usuarioApi._id,
      nome: usuarioApi.name,
      email: usuarioApi.email,
      cpf: usuarioApi.cpf,
      tipo: usuarioApi.tipo || 'usuario',
      avatar: usuarioApi.tipo === 'admin' ? 'ADM' : 'USER'
    }

    setUser(commonUser)
    localStorage.setItem('nami_user', JSON.stringify(commonUser))

    if (token) {
      localStorage.setItem('nami_token', token)
    }

    return commonUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('nami_user')
    localStorage.removeItem('nami_token')
  }

  useEffect(() => {
    async function validarSessao() {
      const token = localStorage.getItem('nami_token')

      if (!token) {
        setAuthLoading(false)
        return
      }

      try {
        const response = await api.get('/usuarios/me')
        salvarSessao(response.data, token)
      } catch (error) {
        logout()
      } finally {
        setAuthLoading(false)
      }
    }

    validarSessao()
  }, [])

  const login = async (identificador, senha) => {
    const response = await api.post('/usuarios/login', {
      identificador,
      password: senha
    })

    const usuarioApi = response.data.user
    const token = response.data.token
    const commonUser = salvarSessao(usuarioApi, token)

    return { sucesso: true, tipo: commonUser.tipo, user: commonUser }
  }

  const isAdmin = () => user?.tipo === 'admin'
  const isLoggedIn = () => user !== null && Boolean(localStorage.getItem('nami_token'))

  return (
    <AuthContext.Provider value={{ user, authLoading, login, logout, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
