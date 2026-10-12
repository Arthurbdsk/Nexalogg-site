'use client';

import { useState } from 'react';

const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

export function CostPerKmCalculator() {
  const [fixed, setFixed] = useState(18000);
  const [variable, setVariable] = useState(2.2);
  const [kilometers, setKilometers] = useState(10000);
  const valid = kilometers > 0 && fixed >= 0 && variable >= 0;
  const fields = [
    { id: 'custos-fixos', label: 'Custos fixos mensais (R$)', value: fixed, set: setFixed, step: '100', min: 0 },
    { id: 'custo-variavel', label: 'Custo variável por km (R$)', value: variable, set: setVariable, step: '0.01', min: 0 },
    { id: 'quilometragem', label: 'Quilômetros totais por mês', value: kilometers, set: setKilometers, step: '100', min: 1 },
  ];
  return (
    <section className="mt-10 border border-line/20 p-6 sm:p-8" aria-labelledby="calculadora-titulo">
      <h2 id="calculadora-titulo" className="text-2xl font-semibold">Simule o custo por km</h2>
      <p className="mt-3 text-sm leading-relaxed text-content/70">Altere os valores para ver como a utilização muda o custo. Inclua quilômetros carregados e vazios no total.</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-3">{fields.map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="mb-2 block text-sm font-semibold">{field.label}</label>
          <input type="number" id={field.id} value={field.value} min={field.min} step={field.step} onChange={(event) => field.set(Number.isFinite(event.target.valueAsNumber) ? Math.max(0, event.target.valueAsNumber) : 0)} className="min-h-12 w-full border border-line/30 bg-surface px-3 text-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500" />
        </div>
      ))}</div>
      <div className="mt-6 grid gap-4 border-t border-line/20 pt-6 sm:grid-cols-3" role="status" aria-live="polite" aria-atomic="true">
        {valid ? <>
          <div><p className="text-sm">Custo por km</p><p className="mt-2 text-3xl font-bold">{currency.format(fixed / kilometers + variable)}</p></div>
          <div><p className="text-sm">Com 20% menos km</p><p className="mt-2 text-2xl font-semibold">{currency.format(fixed / (kilometers * 0.8) + variable)}</p></div>
          <div><p className="text-sm">Com 20% mais km</p><p className="mt-2 text-2xl font-semibold">{currency.format(fixed / (kilometers * 1.2) + variable)}</p></div>
        </> : <p>Informe uma quilometragem maior que zero para calcular.</p>}
      </div>
      <p className="mt-6 text-xs leading-relaxed text-content/60">Simulação com custos fixos e custo variável unitário constantes. Não inclui tributos sobre receita ou margem desejada e não define o preço final do frete.</p>
    </section>
  );
}
