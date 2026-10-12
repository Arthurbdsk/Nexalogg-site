'use client';

import { useState } from 'react';
import { blogTools, calculateBlogTool, defaultToolValues, formatToolMetric, toolCsv, type CalculatorKind } from '@/lib/blog-calculators';
import { track } from '@/lib/analytics';

export function PracticalCalculator({ kind, articleSlug }: { kind: CalculatorKind; articleSlug: string }) {
  const definition = blogTools[kind];
  const [inputs, setInputs] = useState(() => Object.fromEntries(Object.entries(defaultToolValues(kind)).map(([key, value]) => [key, String(value)])));
  const values = Object.fromEntries(Object.entries(inputs).map(([key, value]) => [key, value.trim() === '' ? NaN : Number(value)]));
  const result = calculateBlogTool(kind, values);
  const download = () => {
    if (result.error) return;
    const csv = toolCsv(kind, values, result) + '\r\n"Artigo";"https://www.nexallog.com.br/blog/' + articleSlug + '"';
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'nexallog-' + articleSlug + '.csv';
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    track('blog_calculator_export', { article: articleSlug, calculator: kind });
  };
  return (
    <section id="ferramenta" className="mt-10 scroll-mt-28 border border-line/20 p-6 sm:p-8" aria-labelledby="ferramenta-titulo">
      <h2 id="ferramenta-titulo" className="text-2xl font-semibold">{definition.title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-content/70">{definition.description}</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">{definition.fields.map((field) => {
        const id = kind + '-' + field.key;
        return <div key={field.key}>
          <label htmlFor={id} className="mb-2 block text-sm font-semibold">{field.label}</label>
          <input id={id} type="number" inputMode="decimal" value={inputs[field.key]} min={field.min} max={field.max} step={field.step} aria-describedby="ferramenta-premissas" onChange={(event) => setInputs((current) => ({ ...current, [field.key]: event.target.value }))} className="min-h-12 w-full border border-line/30 bg-surface px-3 text-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500" />
        </div>;
      })}</div>
      <div className="mt-7 border-t border-line/20 pt-6" role="status" aria-live="polite" aria-atomic="true">
        {result.error ? <p className="font-semibold text-content">{result.error}</p> : <dl className="grid gap-7 sm:grid-cols-2">{result.metrics.map((metric) => <div key={metric.label}><dt className="text-sm text-content/75">{metric.label}</dt><dd className="mt-2 break-words text-[clamp(1.5rem,2.5vw,2rem)] font-bold tabular-nums">{formatToolMetric(metric)}</dd></div>)}</dl>}
      </div>
      <p id="ferramenta-premissas" className="mt-6 text-xs leading-relaxed text-content/60">{definition.note}</p>
      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={download} disabled={Boolean(result.error)} className="min-h-11 bg-brand-500 px-5 py-3 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-paper disabled:cursor-not-allowed disabled:opacity-40">Baixar memória do cálculo (.csv)</button>
        <button type="button" onClick={() => setInputs(Object.fromEntries(Object.entries(defaultToolValues(kind)).map(([key, value]) => [key, String(value)])))} className="min-h-11 border border-line/30 px-5 py-3 text-sm font-semibold hover:border-content">Restaurar exemplo</button>
      </div>
      <p className="mt-4 text-xs text-content/60">Os cálculos são feitos neste navegador. Os valores digitados não são enviados ao site.</p>
    </section>
  );
}
