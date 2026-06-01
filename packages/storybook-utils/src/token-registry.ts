import type { TokenCategory, TokenStatus } from './TokenUsage'

export interface RegistryToken {
  category: TokenCategory
  value: string
  status: TokenStatus
}

export const tokenRegistry: Record<string, RegistryToken> = {
  'brand': { category: 'color', value: '#7B1234', status: 'confirmed' },
  'neutral-400': { category: 'color', value: '#B5A8AD', status: 'confirmed' },

  'surface/background': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'surface/element': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'text/main': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'text/muted': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'action/primary/default': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'action/primary/hover': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'border/divider': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'feedback/success': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'feedback/error': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'feedback/warning': { category: 'color', value: '#cccccc', status: 'pending-design' },
  'feedback/info': { category: 'color', value: '#cccccc', status: 'pending-design' },

  'green-50': { category: 'color', value: '#F0FDF4', status: 'pending-design' },
  'green-200': { category: 'color', value: '#BBF7D0', status: 'pending-design' },
  'green-700': { category: 'color', value: '#15803D', status: 'pending-design' },
  'green-800': { category: 'color', value: '#166534', status: 'pending-design' },
  'green-500': { category: 'color', value: '#22C55E', status: 'pending-design' },

  'yellow-50': { category: 'color', value: '#FEFCE8', status: 'pending-design' },
  'yellow-200': { category: 'color', value: '#FEF08A', status: 'pending-design' },
  'yellow-700': { category: 'color', value: '#A16207', status: 'pending-design' },
  'yellow-800': { category: 'color', value: '#854D0E', status: 'pending-design' },

  'red-50': { category: 'color', value: '#FFF1F2', status: 'pending-design' },
  'red-200': { category: 'color', value: '#FECDD3', status: 'pending-design' },
  'red-500': { category: 'color', value: '#EF4444', status: 'pending-design' },
  'red-600': { category: 'color', value: '#DC2626', status: 'pending-design' },
  'red-700': { category: 'color', value: '#B91C1C', status: 'pending-design' },
  'red-800': { category: 'color', value: '#991B1B', status: 'pending-design' },

  'blue-50': { category: 'color', value: '#EFF6FF', status: 'pending-design' },
  'blue-200': { category: 'color', value: '#BFDBFE', status: 'pending-design' },
  'blue-700': { category: 'color', value: '#1D4ED8', status: 'pending-design' },
  'blue-800': { category: 'color', value: '#1E40AF', status: 'pending-design' },

  'gray-100': { category: 'color', value: '#F3F4F6', status: 'pending-design' },
  'gray-200': { category: 'color', value: '#E5E7EB', status: 'pending-design' },
  'gray-300': { category: 'color', value: '#D1D5DB', status: 'pending-design' },
  'gray-500': { category: 'color', value: '#6B7280', status: 'pending-design' },
  'gray-600': { category: 'color', value: '#4B5563', status: 'pending-design' },

  'white': { category: 'color', value: '#FFFFFF', status: 'pending-design' },

  'spacing-4': { category: 'spacing', value: '4px', status: 'confirmed' },
  'spacing-8': { category: 'spacing', value: '8px', status: 'confirmed' },
  'spacing-10': { category: 'spacing', value: '10px', status: 'pending-design' },
  'spacing-12': { category: 'spacing', value: '12px', status: 'pending-design' },
  'spacing-16': { category: 'spacing', value: '16px', status: 'confirmed' },
  'spacing-24': { category: 'spacing', value: '24px', status: 'confirmed' },
  'spacing-32': { category: 'spacing', value: '32px', status: 'confirmed' },
  'spacing-40': { category: 'spacing', value: '40px', status: 'confirmed' },
  'spacing-48': { category: 'spacing', value: '48px', status: 'confirmed' },
  'spacing-64': { category: 'spacing', value: '64px', status: 'confirmed' },

  'radius-0': { category: 'radius', value: '0px', status: 'confirmed' },
  'radius-4': { category: 'radius', value: '4px', status: 'confirmed' },
  'radius-8': { category: 'radius', value: '8px', status: 'confirmed' },
  'radius-12': { category: 'radius', value: '12px', status: 'pending-design' },
  'radius-16': { category: 'radius', value: '16px', status: 'confirmed' },
  'radius-32': { category: 'radius', value: '32px', status: 'confirmed' },
  'radius-full': { category: 'radius', value: '9999px', status: 'confirmed' },

  'Heading/H1': { category: 'typography', value: '32px', status: 'confirmed' },
  'Heading/H2': { category: 'typography', value: '28px', status: 'confirmed' },
  'Heading/H3': { category: 'typography', value: '24px', status: 'confirmed' },
  'Heading/H4': { category: 'typography', value: '20px', status: 'confirmed' },
  'Heading/H5': { category: 'typography', value: '18px', status: 'confirmed' },
  'Heading/H6': { category: 'typography', value: '16px', status: 'confirmed' },
  'Body/Main': { category: 'typography', value: '16px', status: 'confirmed' },
  'Action/Button': { category: 'typography', value: '14px', status: 'confirmed' },
  'Caption': { category: 'typography', value: '12px', status: 'confirmed' },
  'font-body': { category: 'typography', value: 'Source Sans 3', status: 'confirmed' },
  'font-heading': { category: 'typography', value: 'Poppins', status: 'confirmed' },

  'shadow-level-1': { category: 'shadow', value: '0px 1px 4px 0px rgba(0,0,0,0.08), 0px 1px 2px 0px rgba(0,0,0,0.06)', status: 'pending-design' },
  'shadow-level-2': { category: 'shadow', value: '0px 4px 12px 0px rgba(0,0,0,0.10), 0px 2px 6px 0px rgba(0,0,0,0.06)', status: 'pending-design' },
  'shadow-level-3': { category: 'shadow', value: '0px 12px 32px 0px rgba(0,0,0,0.12), 0px 4px 12px 0px rgba(0,0,0,0.08)', status: 'pending-design' },

  'focus-standard': { category: 'focus', value: 'ring', status: 'pending-design' },
  'focus-on-brand': { category: 'focus', value: 'ring white/60', status: 'pending-design' },
  'focus-compact': { category: 'focus', value: 'ring-2', status: 'pending-design' },
}
