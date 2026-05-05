import { useState } from 'react'
import { cn } from '@/lib/utils'
import { FaUserCircle } from 'react-icons/fa'

export function Avatar({ src, alt, size = 40, className }) {
  const [error, setError] = useState(false)
  const showImage = src && !error

  return (
    <div
      className={cn('relative inline-flex shrink-0 overflow-hidden rounded-full bg-muted', className)}
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setError(true)}
          className="aspect-square h-full w-full object-cover"
        />
      ) : (
        <FaUserCircle className="h-full w-full text-muted-foreground" />
      )}
    </div>
  )
}
