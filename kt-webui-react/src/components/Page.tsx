import type { PropsWithChildren, ReactNode } from 'react'

type PageProps = PropsWithChildren<{
  title: string
  description?: ReactNode
  footnote?: ReactNode
}>

export function Page({ title, description, footnote, children }: PageProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
        {description ? <p className="text-slate-600">{description}</p> : null}
      </div>
      {children ? (
        children
      ) : (
        <div className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-500">
          Coming soon: {title} view
        </div>
      )}
      {footnote ? <div className="text-sm text-slate-500">{footnote}</div> : null}
    </div>
  )
}
