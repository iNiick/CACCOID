import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userName, setUserName] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedRole = localStorage.getItem('role');

    if (token && savedRole) {
      setUserName(savedRole === 'User' ? 'Aluno' : 'Administrador');
      setRole(savedRole);
    }

    setLoading(false);
  }, []);

  const login = (token, role) => {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    setRole(role);
    setUserName(role === 'User' ? 'Aluno' : 'Administrador');
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUserName(null);
    setRole(null);
  };

  const isAuthenticated = !!userName && !!role;

  if (loading) return null;

  return (
    <AuthContext.Provider
      value={{ userName, role, login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
