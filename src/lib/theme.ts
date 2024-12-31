import { Poppins, Caveat } from 'next/font/google'

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
})

export const theme = {
  colors: {
    background: '#F4F7FD',
    surface: '#FFFFFF',
    surfaceLight: '#F0F4F8',
    primary: '#3B82F6',
    primaryDark: '#2563EB',
    secondary: '#10B981',
    accent: '#8B5CF6',
    error: '#EF4444',
    text: {
      primary: '#1F2937',
      secondary: '#4B5563',
      tertiary: '#9CA3AF'
    }
  },
  categories: {
    naoCategorizada: { color: '#9CA3AF', label: 'Não categorizada', description: 'Metas ainda não classificadas em uma categoria específica.' },
    carreiraTrabalho: { color: '#EF4444', label: 'Carreira/Trabalho', description: 'Desenvolvimento de habilidades profissionais e progresso na carreira.' },
    financas: { color: '#10B981', label: 'Finanças', description: 'Gestão financeira, planejamento e construção de segurança econômica.' },
    saudeFisica: { color: '#3B82F6', label: 'Saúde Física', description: 'Cuidado com o corpo por meio de exercícios, alimentação e sono de qualidade.' },
    saudeMental: { color: '#8B5CF6', label: 'Saúde Mental', description: 'Gerenciamento do estresse, autoconhecimento e equilíbrio emocional.' },
    relacionamentos: { color: '#F59E0B', label: 'Relacionamentos', description: 'Fortalecer conexões familiares, sociais e interpessoais saudáveis.' },
    desenvolvimentoPessoal: { color: '#06B6D4', label: 'Desenvolvimento Pessoal', description: 'Aprendizado contínuo, hobbies e conexão com propósito de vida.' },
    lazerRecreacao: { color: '#F97316', label: 'Lazer e Recreação', description: 'Momentos de descanso, diversão e práticas que trazem prazer.' },
    ambienteFisico: { color: '#6366F1', label: 'Ambiente Físico', description: 'Melhoria e organização de espaços físicos para bem-estar e produtividade.' }
  },
  fonts: {
    ui: 'var(--font-poppins)',
    content: 'var(--font-caveat)'
  },
  shadows: {
    small: '0 2px 4px rgba(0,0,0,0.1)',
    medium: '0 4px 6px rgba(0,0,0,0.1)',
    large: '0 10px 15px rgba(0,0,0,0.1)'
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }
}

export type Category = keyof typeof theme.categories

