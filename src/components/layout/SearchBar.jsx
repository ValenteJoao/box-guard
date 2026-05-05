import { HiOutlineSearch } from 'react-icons/hi'
import { Input } from '@/components/ui/input'

export default function SearchBar({ value, onChange, placeholder = 'Pesquisar...' }) {
  return (
    <div className="relative w-full">
      <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
      <Input value={value} onChange={onChange} placeholder={placeholder} className="pl-9" />
    </div>
  )
}
