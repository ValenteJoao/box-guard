import { useEffect } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { LuPackage, LuTag, LuWarehouse, LuFileText } from 'react-icons/lu'
import { cn } from '@/lib/utils'

const CATEGORIAS = [
  'Eletrônicos', 'Acessórios', 'Vestuário', 'Calçados', 'Casa e decoração',
  'Beleza', 'Esportes', 'Brinquedos', 'Livros', 'Alimentos', 'Outros',
]

const UNIDADES = [
  { v: 'un', l: 'Unidade (un)' },
  { v: 'cx', l: 'Caixa (cx)' },
  { v: 'pç', l: 'Peça (pç)' },
  { v: 'kg', l: 'Quilograma (kg)' },
  { v: 'g',  l: 'Grama (g)' },
  { v: 'l',  l: 'Litro (l)' },
  { v: 'ml', l: 'Mililitro (ml)' },
  { v: 'm',  l: 'Metro (m)' },
]

function Section({ icon: Icon, title, description, children }) {
  return (
    <section className="space-y-4">
      <header className="flex items-start gap-3 pb-3 border-b">
        <div className="h-9 w-9 rounded-md bg-primary/10 text-primary grid place-items-center shrink-0">
          <Icon size={18} />
        </div>
        <div className="space-y-0.5">
          <h3 className="font-semibold text-sm leading-none">{title}</h3>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      </header>
      {children}
    </section>
  )
}

function Field({ label, htmlFor, hint, required, children, className }) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={htmlFor} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive text-xs">*</span>}
      </Label>
      {children}
      {hint && <p className="text-[11px] text-muted-foreground">{hint}</p>}
    </div>
  )
}

function MoneyInput({ id, register, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground pointer-events-none">R$</span>
      <Input id={id} type="number" step="0.01" min="0" placeholder="0,00" className="pl-9 tabular" {...register} {...props} />
    </div>
  )
}

const fmtPct = (n) => (Number.isFinite(n) ? `${n > 0 ? '+' : ''}${n.toFixed(1)}%` : '—')

export default function ProdutoForm({ defaultValues, onSubmit, submitLabel = 'Salvar' }) {
  const { register, handleSubmit, reset, control, formState: { isSubmitting, isDirty } } = useForm({
    defaultValues: { unidade: 'un', categoria: 'Outros', estoqueMinimo: 5 },
  })

  useEffect(() => { if (defaultValues) reset({ unidade: 'un', categoria: 'Outros', estoqueMinimo: 5, ...defaultValues }) }, [defaultValues, reset])

  const watched = useWatch({ control })
  const custo = Number(watched.precoCusto) || 0
  const varejo = Number(watched.precoVenda) || 0
  const atacado = Number(watched.precoAtacado) || 0
  const margemVarejo = custo > 0 ? ((varejo - custo) / custo) * 100 : NaN
  const margemAtacado = custo > 0 ? ((atacado - custo) / custo) * 100 : NaN

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <Section icon={LuPackage} title="Identificação" description="Informações básicas do produto">
        <div className="grid gap-4 sm:grid-cols-6">
          <Field label="Nome do produto" htmlFor="nomeProduto" required className="sm:col-span-4">
            <Input id="nomeProduto" placeholder="Ex: Fone KZ Edx Pro" required {...register('nomeProduto')} />
          </Field>
          <Field label="SKU" htmlFor="sku" hint="Código interno" className="sm:col-span-2">
            <Input id="sku" placeholder="Ex: FNE-001" className="tabular" {...register('sku')} />
          </Field>

          <Field label="Modelo / Variação" htmlFor="modelo" required className="sm:col-span-2">
            <Input id="modelo" placeholder="Ex: Preto" required {...register('modelo')} />
          </Field>
          <Field label="Marca" htmlFor="marca" className="sm:col-span-2">
            <Input id="marca" placeholder="Ex: KZ" {...register('marca')} />
          </Field>
          <Field label="Categoria" htmlFor="categoria" className="sm:col-span-2">
            <Select id="categoria" {...register('categoria')}>
              {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
          </Field>
        </div>
      </Section>

      <Section icon={LuTag} title="Preços" description="Valores de custo e venda — margens calculadas automaticamente">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Valor de custo" htmlFor="precoCusto" required>
            <MoneyInput id="precoCusto" register={register('precoCusto')} required />
          </Field>
          <Field label="Valor varejo" htmlFor="precoVenda" required hint={`Margem: ${fmtPct(margemVarejo)}`}>
            <MoneyInput id="precoVenda" register={register('precoVenda')} required />
          </Field>
          <Field label="Valor atacado" htmlFor="precoAtacado" required hint={`Margem: ${fmtPct(margemAtacado)}`}>
            <MoneyInput id="precoAtacado" register={register('precoAtacado')} required />
          </Field>
        </div>
      </Section>

      <Section icon={LuWarehouse} title="Estoque" description="Quantidades e alertas de reposição">
        <div className="grid gap-4 sm:grid-cols-4">
          <Field label="Unidade" htmlFor="unidade">
            <Select id="unidade" {...register('unidade')}>
              {UNIDADES.map((u) => <option key={u.v} value={u.v}>{u.l}</option>)}
            </Select>
          </Field>
          <Field label="Estoque atual" htmlFor="estoque" required>
            <Input id="estoque" type="number" min="0" placeholder="0" required className="tabular" {...register('estoque')} />
          </Field>
          <Field label="Estoque futuro" htmlFor="estoqueFuturo" hint="Pedidos em trânsito">
            <Input id="estoqueFuturo" type="number" min="0" placeholder="0" required className="tabular" {...register('estoqueFuturo')} />
          </Field>
          <Field label="Estoque mínimo" htmlFor="estoqueMinimo" hint="Alerta de reposição">
            <Input id="estoqueMinimo" type="number" min="0" placeholder="5" className="tabular" {...register('estoqueMinimo')} />
          </Field>
        </div>
      </Section>

      <Section icon={LuFileText} title="Detalhes adicionais" description="Opcional — informações complementares">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Fornecedor" htmlFor="fornecedor">
            <Input id="fornecedor" placeholder="Nome do fornecedor" {...register('fornecedor')} />
          </Field>
          <Field label="Código de barras" htmlFor="codigoBarras">
            <Input id="codigoBarras" placeholder="EAN / UPC" className="tabular" {...register('codigoBarras')} />
          </Field>
          <Field label="Observações" htmlFor="observacoes" className="sm:col-span-2">
            <Textarea id="observacoes" placeholder="Notas internas sobre o produto..." rows={3} {...register('observacoes')} />
          </Field>
        </div>
      </Section>

      <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-4 border-t">
        <p className="text-xs text-muted-foreground">
          {isDirty ? 'Você tem alterações não salvas.' : 'Campos com * são obrigatórios.'}
        </p>
        <div className="flex gap-2">
          <Button type="button" variant="outline" onClick={() => reset(defaultValues || {})}>
            Limpar
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : submitLabel}
          </Button>
        </div>
      </div>
    </form>
  )
}
