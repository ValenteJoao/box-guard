import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function PaginacaoComponent({ setCurrentPage, currentPage, pages }) {
  if (pages <= 1) return null
  const go = (i) => i >= 0 && i < pages && setCurrentPage(i)

  return (
    <div className="flex items-center justify-center gap-1 mt-6">
      <Button variant="outline" size="icon" onClick={() => go(currentPage - 1)} disabled={currentPage === 0}>
        <HiChevronLeft size={16} />
      </Button>
      {Array.from({ length: pages }).map((_, i) => (
        <Button
          key={i}
          onClick={() => setCurrentPage(i)}
          variant={i === currentPage ? 'default' : 'ghost'}
          size="sm"
          className={cn('min-w-9', i === currentPage && 'pointer-events-none')}
        >
          {i + 1}
        </Button>
      ))}
      <Button variant="outline" size="icon" onClick={() => go(currentPage + 1)} disabled={currentPage === pages - 1}>
        <HiChevronRight size={16} />
      </Button>
    </div>
  )
}
