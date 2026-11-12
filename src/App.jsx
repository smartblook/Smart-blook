import { useEffect, useMemo, useState } from 'react';

const blockStyles = [
  {
    id: 'plain',
    name: 'Plain',
    description: 'Clean, timeless lines for driveways and walkways.',
    className: 'pattern-plain',
    color: 'bg-slate-100 text-slate-900',
  },
  {
    id: 'zigzag',
    name: 'Zig-Zag',
    description: 'An interlocking pattern designed for extra grip and strength.',
    className: 'pattern-zigzag',
    color: 'bg-amber-400 text-slate-950',
  },
  {
    id: 'designer',
    name: 'Designer',
    description: 'A decorative finish that makes outdoor spaces stand out.',
    className: 'pattern-designer',
    color: 'bg-emerald-400 text-slate-950',
  },
];

const BLOCK_AREA_SQFT = (200 * 100) / 1_000_000 * 10.7639;
const WASTE_FACTOR = 1.05;
const WHATSAPP_NUMBER = '919812185001';

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits }).format(value);
}

export default function App() {
  const [selectedStyle, setSelectedStyle] = useState('plain');
  const [photo, setPhoto] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [pricePerSqft, setPricePerSqft] = useState('');

  useEffect(() => () => {
    if (photo) URL.revokeObjectURL(photo);
  }, [photo]);

  const selectedBlock = blockStyles.find((style) => style.id === selectedStyle) ?? blockStyles[0];
  const area = useMemo(() => {
    const parsedLength = Number(length);
    const parsedWidth = Number(width);
    return parsedLength > 0 && parsedWidth > 0 ? parsedLength * parsedWidth : 0;
  }, [length, width]);
  const quantity = area ? Math.ceil((area / BLOCK_AREA_SQFT) * WASTE_FACTOR) : 0;
  const estimate = area && Number(pricePerSqft) > 0 ? area * Number(pricePerSqft) : 0;

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setPhoto(URL.createObjectURL(file));
    }
  }

  function makeWhatsAppUrl() {
    const message = [
      'Hi Smart Block! I would like to enquire about paver blocks.',
      `Pattern: ${selectedBlock.name}`,
      area ? `Area: ${formatNumber(area, 2)} sq ft (${length} ft × ${width} ft)` : 'Area: Please help me calculate it.',
      quantity ? `Estimated quantity (including 5% waste): ${formatNumber(quantity)} blocks` : '',
      estimate ? `Indicative price estimate: ₹${formatNumber(estimate, 2)}` : '',
    ].filter(Boolean).join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/70 pb-5">
        <a href="#home" className="flex items-center gap-3 text-white no-underline" aria-label="Smart Block home">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400 text-xl font-black text-slate-950">SB</span>
          <span><span className="block text-lg font-bold tracking-tight">Smart Block</span><span className="block text-xs text-slate-400">Paver visualizer & estimator</span></span>
        </a>
        <a href={makeWhatsAppUrl()} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">
          WhatsApp us <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section id="home" className="grid items-center gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div>
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-emerald-300">Plan it. Preview it. Build it.</p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">A better view of your <span className="text-emerald-300">next project.</span></h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Preview paver patterns on your own space, estimate what you need, and get expert help with one quick message.</p>
          <a href="#visualizer" className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-100">Start visualizing <span className="ml-2" aria-hidden="true">↓</span></a>
        </div>
        <div className="glass-panel relative overflow-hidden rounded-3xl p-4 sm:p-6">
          <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 sm:h-80">
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, transparent 48%, rgba(52,211,153,.65) 49%, rgba(52,211,153,.65) 51%, transparent 52%), linear-gradient(45deg, transparent 48%, rgba(255,255,255,.2) 49%, rgba(255,255,255,.2) 51%, transparent 52%)', backgroundSize: '56px 56px' }} />
            <div className="absolute bottom-5 left-5 rounded-xl border border-white/15 bg-slate-950/75 px-4 py-3 backdrop-blur">
              <span className="block text-xs uppercase tracking-wider text-slate-400">Your space, reimagined</span>
              <span className="font-semibold text-white">Visualize before you build</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-300"><span>Three patterns to explore</span><span className="text-emerald-300">● ● ●</span></div>
        </div>
      </section>

      <section id="visualizer" className="scroll-mt-6 py-8">
        <div className="mb-6">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">01 / Live preview</p>
          <h2 className="mt-2 text-3xl font-bold text-white">See it on your space</h2>
          <p className="mt-2 text-slate-400">Upload a photo and switch patterns to explore the look. Your photo stays in this browser.</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="glass-panel rounded-3xl p-4 sm:p-6">
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-slate-800 sm:min-h-96">
              {photo ? <img src={photo} alt="Uploaded project area preview" className="absolute inset-0 h-full w-full object-cover" /> : <div className="max-w-sm px-6 text-center"><span className="text-5xl" aria-hidden="true">⌂</span><p className="mt-3 font-semibold text-white">Your project preview appears here</p><p className="mt-1 text-sm text-slate-400">Upload a clear photo of your driveway, patio, or walkway.</p></div>}
              <div aria-label={`${selectedBlock.name} pattern preview`} className={`pointer-events-none absolute inset-0 ${selectedBlock.className}`} style={{ opacity: photo ? 0.45 : 0.8, mixBlendMode: photo ? 'multiply' : 'normal' }} />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{selectedBlock.name} pattern</span>
            </div>
            <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-600 px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-300 hover:text-emerald-200">
              <span aria-hidden="true" className="mr-2">＋</span>{photo ? 'Choose a different photo' : 'Upload a project photo'}
              <input className="sr-only" type="file" accept="image/*" onChange={handlePhotoChange} />
            </label>
          </div>
          <aside className="glass-panel rounded-3xl p-5 sm:p-6">
            <h3 className="text-lg font-bold text-white">Choose a pattern</h3>
            <div className="mt-4 space-y-3">
              {blockStyles.map((style) => (
                <button key={style.id} type="button" onClick={() => setSelectedStyle(style.id)} aria-pressed={selectedStyle === style.id} className={`w-full rounded-2xl border p-4 text-left transition ${selectedStyle === style.id ? 'border-emerald-300 bg-emerald-300/10' : 'border-slate-700 bg-slate-900/50 hover:border-slate-500'}`}>
                  <span className="flex items-center justify-between"><span className="font-bold text-white">{style.name}</span><span className={`h-5 w-5 rounded-full ${style.color}`} aria-hidden="true" /></span>
                  <span className="mt-1 block text-sm leading-5 text-slate-400">{style.description}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">Preview is illustrative. Final appearance varies with site conditions and installation.</p>
          </aside>
        </div>
      </section>

      <section id="catalog" className="scroll-mt-6 py-14">
        <div className="mb-6"><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">02 / Block catalog</p><h2 className="mt-2 text-3xl font-bold text-white">Find your finish</h2><p className="mt-2 text-slate-400">Explore interlocking styles for practical, beautiful outdoor spaces.</p></div>
        <div className="grid gap-4 md:grid-cols-3">
          {blockStyles.map((style, index) => (
            <article key={style.id} className="glass-panel overflow-hidden rounded-3xl">
              <div className={`relative h-40 ${style.className}`}><span className="absolute bottom-3 left-3 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white">0{index + 1} / Pattern</span></div>
              <div className="p-5"><h3 className="text-xl font-bold text-white">{style.name}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{style.description}</p><button type="button" onClick={() => { setSelectedStyle(style.id); document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' }); }} className="mt-4 text-sm font-bold text-emerald-300 hover:text-emerald-200">Preview this style <span aria-hidden="true">→</span></button></div>
            </article>
          ))}
        </div>
      </section>

      <section id="calculator" className="scroll-mt-6 py-10">
        <div className="mb-6"><p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">03 / Project estimate</p><h2 className="mt-2 text-3xl font-bold text-white">Estimate area & quantity</h2><p className="mt-2 text-slate-400">Enter measurements in feet. The block estimate includes a 5% waste margin.</p></div>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-3xl p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-300">Length (ft)<input type="number" min="0" step="0.1" value={length} onChange={(event) => setLength(event.target.value)} placeholder="e.g. 20" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-300" /></label>
              <label className="text-sm font-semibold text-slate-300">Width (ft)<input type="number" min="0" step="0.1" value={width} onChange={(event) => setWidth(event.target.value)} placeholder="e.g. 12" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-300" /></label>
            </div>
            <label className="mt-4 block text-sm font-semibold text-slate-300">Indicative price per sq ft (₹, optional)<input type="number" min="0" step="1" value={pricePerSqft} onChange={(event) => setPricePerSqft(event.target.value)} placeholder="Enter a rate to estimate price" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-300" /></label>
            <p className="mt-4 text-xs leading-5 text-slate-500">Quantity uses a nominal 200 × 100 mm block size plus 5% allowance. Actual quantities and prices vary by product, layout, and site; confirm before ordering.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="metric-card"><span className="text-sm text-slate-400">Total area</span><strong className="mt-3 block text-3xl font-black text-white">{formatNumber(area, 2)} <span className="text-base font-medium text-slate-400">sq ft</span></strong><span className="mt-2 block text-xs text-slate-500">Length × width</span></div>
            <div className="metric-card"><span className="text-sm text-slate-400">Estimated blocks</span><strong className="mt-3 block text-3xl font-black text-white">{formatNumber(quantity)}</strong><span className="mt-2 block text-xs text-emerald-300">Includes 5% waste margin</span></div>
            <div className="metric-card sm:col-span-2"><span className="text-sm text-slate-400">Indicative material estimate</span><strong className="mt-3 block text-3xl font-black text-white">{estimate ? `₹${formatNumber(estimate, 2)}` : 'Add a price per sq ft'}</strong><span className="mt-2 block text-xs text-slate-500">Based on entered area × entered rate; excludes installation and other charges.</span></div>
          </div>
        </div>
      </section>

      <section className="my-12 rounded-3xl bg-emerald-300 p-6 text-slate-950 sm:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-950/70">Ready for the next step?</p><h2 className="mt-2 text-3xl font-black">Let’s plan your project.</h2><p className="mt-2 max-w-xl text-emerald-950/80">Send your selected pattern and estimate to our team on WhatsApp. We’ll help you with product details and a project-ready quote.</p></div>
          <a href={makeWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-slate-950 px-6 py-4 font-bold text-white transition hover:bg-slate-800"><span className="mr-2" aria-hidden="true">☏</span> Get a WhatsApp quote <span className="ml-2" aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-2 border-t border-slate-700/70 py-6 text-sm text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} Smart Block. Built for better outdoor spaces.</span><a className="text-slate-400 hover:text-emerald-300" href={makeWhatsAppUrl()} target="_blank" rel="noreferrer">Contact us on WhatsApp</a></footer>
    </main>
  );
}
