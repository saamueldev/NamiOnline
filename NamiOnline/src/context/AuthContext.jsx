import { createContext, useState } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Verifica se há usuário armazenado no localStorage
    const savedUser = localStorage.getItem('nami_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = async (identificador, senha) => {
    // Credenciais de admin
    const adminCredentials = {
      email: 'admin@nami.com',
      senha: 'admin123'
    }

    // Verifica se é admin
    if (identificador === adminCredentials.email && senha === adminCredentials.senha) {
      const adminUser = {
        id: 1,
        nome: 'Administrador',
        email: identificador,
        tipo: 'admin',
        avatar: '👨‍💼'
      }
      setUser(adminUser)
      localStorage.setItem('nami_user', JSON.stringify(adminUser))
      return { sucesso: true, tipo: 'admin' }
    }

    const response = await api.post('/usuarios/login', {
      identificador,
      password: senha
    })

    const usuarioApi = response.data.user

    const commonUser = {
      id: usuarioApi._id,
      nome: usuarioApi.name,
      email: usuarioApi.email,
      cpf: usuarioApi.cpf,
      tipo: 'usuario',
      avatar: '👤'
    }

    setUser(commonUser)
    localStorage.setItem('nami_user', JSON.stringify(commonUser))
    return { sucesso: true, tipo: 'usuario', user: commonUser }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('nami_user')
  }

  const isAdmin = () => user?.tipo === 'admin'
  const isLoggedIn = () => user !== null

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}
