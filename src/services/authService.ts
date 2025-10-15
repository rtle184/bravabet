// Serviço de Autenticação - Gerencia cadastro e login de usuários

export interface User {
  name: string;
  email: string;
  cpf: string;
  password: string;
  createdAt: string;
}

const USERS_STORAGE_KEY = 'bravabet_users';
const CURRENT_USER_KEY = 'bravabet_current_user';

// Formata CPF para validação
export function formatCPF(cpf: string): string {
  return cpf.replace(/\D/g, '');
}

// Valida CPF
export function validateCPF(cpf: string): boolean {
  const cleanCPF = formatCPF(cpf);
  
  if (cleanCPF.length !== 11) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cleanCPF)) return false;
  
  // Validação do primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(9))) return false;
  
  // Validação do segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cleanCPF.charAt(10))) return false;
  
  return true;
}

// Máscara de CPF para exibição
export function maskCPF(cpf: string): string {
  const cleanCPF = formatCPF(cpf);
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

// Busca todos os usuários cadastrados
function getAllUsers(): User[] {
  try {
    const usersJson = localStorage.getItem(USERS_STORAGE_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    return [];
  }
}

// Salva usuários no localStorage
function saveUsers(users: User[]): void {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
  }
}

// Verifica se email já existe
export function emailExists(email: string): boolean {
  const users = getAllUsers();
  return users.some(user => user.email.toLowerCase() === email.toLowerCase());
}

// Verifica se CPF já existe
export function cpfExists(cpf: string): boolean {
  const users = getAllUsers();
  const cleanCPF = formatCPF(cpf);
  return users.some(user => formatCPF(user.cpf) === cleanCPF);
}

// Registra novo usuário
export function registerUser(userData: {
  name: string;
  email: string;
  cpf: string;
  password: string;
}): { success: boolean; message: string; user?: Omit<User, 'password'> } {
  // Valida CPF
  if (!validateCPF(userData.cpf)) {
    return { success: false, message: 'CPF inválido' };
  }

  // Verifica se email já existe
  if (emailExists(userData.email)) {
    return { 
      success: false, 
      message: 'Este email já está cadastrado. Por favor, faça login ou use outro email.' 
    };
  }

  // Verifica se CPF já existe
  if (cpfExists(userData.cpf)) {
    return { 
      success: false, 
      message: 'Este CPF já está cadastrado. Por favor, faça login.' 
    };
  }

  // Cria novo usuário
  const newUser: User = {
    name: userData.name,
    email: userData.email,
    cpf: formatCPF(userData.cpf),
    password: userData.password, // Em produção, use hash (bcrypt)
    createdAt: new Date().toISOString()
  };

  // Adiciona aos usuários cadastrados
  const users = getAllUsers();
  users.push(newUser);
  saveUsers(users);

  // Retorna usuário sem senha
  const { password, ...userWithoutPassword } = newUser;
  return { 
    success: true, 
    message: 'Cadastro realizado com sucesso!',
    user: userWithoutPassword
  };
}

// Faz login do usuário
export function loginUser(email: string, password: string): { 
  success: boolean; 
  message: string; 
  user?: Omit<User, 'password'> 
} {
  const users = getAllUsers();
  const user = users.find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) {
    return { 
      success: false, 
      message: 'Email ou senha incorretos' 
    };
  }

  // Salva usuário logado
  const { password: _, ...userWithoutPassword } = user;
  setCurrentUser(userWithoutPassword);

  return { 
    success: true, 
    message: 'Login realizado com sucesso!',
    user: userWithoutPassword
  };
}

// Salva usuário atual logado
export function setCurrentUser(user: Omit<User, 'password'> | null): void {
  try {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  } catch (error) {
    console.error('Erro ao salvar usuário atual:', error);
  }
}

// Busca usuário atual logado
export function getCurrentUser(): Omit<User, 'password'> | null {
  try {
    const userJson = localStorage.getItem(CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  } catch (error) {
    console.error('Erro ao buscar usuário atual:', error);
    return null;
  }
}

// Faz logout
export function logout(): void {
  setCurrentUser(null);
}

// Busca dados do usuário pelo email
export function getUserByEmail(email: string): Omit<User, 'password'> | null {
  const users = getAllUsers();
  const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
  
  if (user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
  
  return null;
}
