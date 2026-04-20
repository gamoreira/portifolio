import { useState } from 'react'
import { Globe } from 'lucide-react'

interface Props {
  src: string
  alt: string
  url: string
  className?: string
}

export default function ProjectImage({ src, alt, url, className = '' }: Props) {
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  return (
    <div className={`relative w-full h-full bg-dark-900 ${className}`}>
      {/* Skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-brand-500/30 border-t-brand-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Image */}
      {status !== 'error' && (
        <>
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover object-top transition-opacity duration-300 ${
              status === 'ok' ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setStatus('ok')}
            onError={() => setStatus('error')}
          />
          {status === 'ok' && (
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-dark-800/80 to-transparent pointer-events-none" />
          )}
        </>
      )}

      {/* Fallback */}
      {status === 'error' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-600 p-4">
          <Globe size={28} />
          <span className="text-xs text-center break-all">{url}</span>
        </div>
      )}
    </div>
  )
}
