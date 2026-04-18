import { createContext, useState } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Verifica se há usuário armazenado no localStorage
    const savedUser = localStorage.getItem('nami_user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  const login = (email, senha) => {
    // Credenciais de admin
    const adminCredentials = {
      email: 'admin@nami.com',
      senha: 'admin123'
    }

    // Verifica se é admin
    if (email === adminCredentials.email && senha === adminCredentials.senha) {
      const adminUser = {
        id: 1,
        nome: 'Administrador',
        email: email,
        tipo: 'admin',
        avatar: '👨‍💼'
      }
      setUser(adminUser)
      localStorage.setItem('nami_user', JSON.stringify(adminUser))
      return { sucesso: true, tipo: 'admin' }
    }

    // Se não for admin, cria usuário comum
    const commonUser = {
      id: Math.random(),
      nome: 'Usuário Nami',
      email: email,
      tipo: 'usuario',
      avatar: '👤'
    }
    setUser(commonUser)
    localStorage.setItem('nami_user', JSON.stringify(commonUser))
    return { sucesso: true, tipo: 'usuario' }
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
