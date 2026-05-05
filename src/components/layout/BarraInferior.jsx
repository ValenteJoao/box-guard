export default function BarraInferior({ infoA, textA }) {
  return (
    <div className="mt-6 pt-4 border-t flex items-center text-xs text-muted-foreground">
      <p>
        {textA}: <span className="text-foreground font-medium">{infoA}</span>
      </p>
    </div>
  )
}
