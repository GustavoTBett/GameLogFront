'use client'

import { toast } from '@/hooks/use-toast'

export function showErrorToast(message: string, title?: string) {
  try {
    toast({
      title: title ?? 'Erro',
      description: message,
      variant: 'destructive',
      duration: 5000,
    })
  } catch (e) {
    // Fallback: console if toast system unavailable
    // no-op in server contexts
    if (typeof window !== 'undefined') console.error('showErrorToast error', e)
  }
}
