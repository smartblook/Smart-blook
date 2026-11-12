import { useEffect, useMemo, useState } from 'react';

const blockStyles = [
  {
    id: 'plain',
    name: 'सादा इंटरलॉकिंग',
    description: 'आँगन, रास्ते और ड्राइववे के लिए साफ़-सुथरा और टिकाऊ डिज़ाइन।',
    className: 'pattern-plain',
    color: 'bg-slate-100 text-slate-900',
  },
  {
    id: 'zigzag',
    name: 'ज़िग-ज़ैग डिज़ाइन',
    description: 'मज़बूत पकड़ और बेहतर टिकाऊपन के लिए आपस में जुड़ने वाला आकार।',
    className: 'pattern-zigzag',
    color: 'bg-amber-400 text-slate-950',
  },
  {
    id: 'designer',
    name: 'डिज़ाइनर पेवर',
    description: 'घर और बाहरी जगह को खास सुंदरता देने वाला आकर्षक डिज़ाइन।',
    className: 'pattern-designer',
    color: 'bg-emerald-400 text-slate-950',
  },
];

// अनुमान २०० × १०० मिमी के एक ब्लॉक के क्षेत्रफल पर आधारित है।
const BLOCK_AREA_SQFT = ((200 * 100) / 1_000_000) * 10.7639;
const WASTE_FACTOR = 1.05;
const WHATSAPP_NUMBER = '919812185001';

function formatNumber(value, maximumFractionDigits = 0) {
  return new Intl.NumberFormat('hi-IN', { maximumFractionDigits }).format(value);
}

export default function App() {
  const [selectedStyle, setSelectedStyle] = useState('plain');
  const [photo, setPhoto] = useState('');
  const [photoError, setPhotoError] = useState('');
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
    setPhotoError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError('कृपया फ़ोटो फ़ाइल चुनें।');
      event.target.value = '';
      return;
    }
    setPhoto(URL.createObjectURL(file));
    event.target.value = '';
  }

  function makeWhatsAppUrl() {
    const message = [
      'नमस्ते Smart Block! मुझे पेवर ब्लॉक के बारे में जानकारी चाहिए।',
      `चुना हुआ डिज़ाइन: ${selectedBlock.name}`,
      area
        ? `क्षेत्रफल: ${formatNumber(area, 2)} वर्ग फुट (${formatNumber(Number(length), 2)} × ${formatNumber(Number(width), 2)} फीट)`
        : 'क्षेत्रफल: कृपया गणना में मेरी मदद करें।',
      quantity ? `५% अतिरिक्त सहित अनुमानित ब्लॉक: ${formatNumber(quantity)} ईंटें` : '',
      estimate
        ? `अनुमानित खर्च: ₹${formatNumber(estimate, 2)}`
        : pricePerSqft && Number(pricePerSqft) > 0
          ? ''
          : 'प्रति वर्ग फुट कीमत अभी नहीं भरी गई है।',
    ].filter(Boolean).join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/70 pb-5">
        <a href="#home" className="flex items-center gap-3 text-white no-underline" aria-label="स्मार्ट ब्लॉक मुख्य पृष्ठ">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400 text-xl font-black text-slate-950">SB</span>
          <span><span className="block text-lg font-bold tracking-tight">Smart Block</span><span className="block text-xs text-slate-400">पेवर ब्लॉक डिज़ाइन और गणना</span></span>
        </a>
        <a href={makeWhatsAppUrl()} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">
          WhatsApp पर बात करें <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section id="home" className="grid items-center gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-20">
        <div>
          <p className="mb-4 text-sm font-bold text-emerald-300">सोचें · देखें · बनवाएँ</p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">अपने नए आँगन को <span className="text-emerald-300">पहले ही देखकर चुनें।</span></h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">अपनी जगह की फ़ोटो पर पेवर ब्लॉक का डिज़ाइन देखें, ज़रूरी मात्रा का अनुमान लगाएँ और एक संदेश में हमसे बात करें।</p>
          <a href="#visualizer" className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-100">डिज़ाइन देखना शुरू करें <span className="ml-2" aria-hidden="true">↓</span></a>
        </div>
        <div className="glass-panel relative overflow-hidden rounded-3xl p-4 sm:p-6">
          <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 sm:h-80">
            <div className="absolute inset-0 opacity-60" style={{ backgroundImage: 'linear-gradient(135deg, transparent 48%, rgba(52,211,153,.65) 49%, rgba(52,211,153,.65) 51%, transparent 52%), linear-gradient(45deg, transparent 48%, rgba(52,211,153,.4) 49%, rgba(52,211,153,.4) 51%, transparent 52%)', backgroundSize: '48px 48px' }} />
            <div className="absolute bottom-5 left-5 rounded-xl border border-white/15 bg-slate-950/75 px-4 py-3 backdrop-blur">
              <span className="block text-xs text-slate-400">आपकी जगह, नया रूप</span>
              <span className="font-semibold text-white">बनवाने से पहले डिज़ाइन देखें</span>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between text-sm text-slate-300"><span>देखने के लिए तीन डिज़ाइन</span><span className="text-emerald-300" aria-label="तीन डिज़ाइन">● ● ●</span></div>
        </div>
      </section>

      <section id="visualizer" className="scroll-mt-6 py-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-emerald-300">०१ / अपनी जगह पर डिज़ाइन</p>
          <h2 className="mt-2 text-3xl font-bold text-white">अपनी जगह का रूप देखकर चुनें</h2>
          <p className="mt-2 text-slate-400">अपनी ज़मीन/आँगन का फ़ोटो अपलोड करें और अलग-अलग डिज़ाइन देखें। आपकी फ़ोटो इसी ब्राउज़र में रहती है।</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="glass-panel rounded-3xl p-4 sm:p-6">
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-slate-800 sm:min-h-96">
              {photo ? <img src={photo} alt="आपकी जगह पर पेवर ब्लॉक डिज़ाइन का पूर्वावलोकन" className="absolute inset-0 h-full w-full object-cover" /> : <div className="max-w-sm px-6 text-center"><span className="text-5xl" aria-hidden="true">▧</span><p className="mt-3 font-semibold text-white">अपनी जगह का फ़ोटो यहाँ देखें</p><p className="mt-1 text-sm text-slate-400">फ़ोटो चुनने के बाद डिज़ाइन इस पर दिखाई देगा।</p></div>}
              <div aria-label={`${selectedBlock.name} का पूर्वावलोकन`} className={`pointer-events-none absolute inset-0 ${selectedBlock.className}`} style={{ opacity: photo ? 0.45 : 0.8, mixBlendMode: photo ? 'multiply' : 'normal' }} />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{selectedBlock.name}</span>
            </div>
            <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-600 px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-400 hover:text-emerald-300">
              <span aria-hidden="true" className="mr-2">＋</span>{photo ? 'दूसरी फ़ोटो चुनें' : 'अपनी जगह का फ़ोटो अपलोड करें'}
              <input className="sr-only" type="file" accept="image/*" onChange={handlePhotoChange} />
            </label>
            {photoError && <p role="alert" className="mt-2 text-sm text-rose-300">{photoError}</p>}
          </div>
          <aside className="glass-panel rounded-3xl p-5 sm:p-6">
            <h3 className="text-lg font-bold text-white">ब्लॉक का डिज़ाइन चुनें</h3>
            <div className="mt-4 space-y-3">
              {blockStyles.map((style) => (
                <button key={style.id} type="button" onClick={() => setSelectedStyle(style.id)} aria-pressed={selectedStyle === style.id} className={`w-full rounded-2xl border p-4 text-left transition ${selectedStyle === style.id ? 'border-emerald-400 bg-emerald-400/10' : 'border-slate-700 hover:border-slate-500'}`}>
                  <span className="flex items-center justify-between"><span className="font-bold text-white">{style.name}</span><span className={`h-5 w-5 rounded-full ${style.color}`} aria-hidden="true" /></span>
                  <span className="mt-1 block text-sm leading-5 text-slate-400">{style.description}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-500">यह केवल देखने के लिए अनुमानित नमूना है। असली रंग और रूप जगह तथा लगाने के तरीके से बदल सकते हैं।</p>
          </aside>
        </div>
      </section>

      <section id="catalog" className="scroll-mt-6 py-14">
        <div className="mb-6"><p className="text-sm font-bold text-emerald-300">०२ / पेवर ब्लॉक सूची</p><h2 className="mt-2 text-3xl font-bold text-white">अपनी पसंद का डिज़ाइन चुनें</h2><p className="mt-2 text-slate-400">किसी डिज़ाइन को चुनें, उसका नमूना ऊपर देखें।</p></div>
        <div className="grid gap-4 md:grid-cols-3">
          {blockStyles.map((style, index) => (
            <article key={style.id} className="glass-panel overflow-hidden rounded-3xl">
              <div className={`relative h-40 ${style.className}`}><span className="absolute bottom-3 left-3 rounded-full bg-slate-950/75 px-3 py-1 text-xs font-semibold text-white">डिज़ाइन {formatNumber(index + 1)}</span></div>
              <div className="p-5"><h3 className="text-xl font-bold text-white">{style.name}</h3><p className="mt-2 min-h-12 text-sm leading-6 text-slate-400">{style.description}</p><button type="button" onClick={() => { setSelectedStyle(style.id); document.getElementById('visualizer')?.scrollIntoView({ behavior: 'smooth' }); }} aria-pressed={selectedStyle === style.id} className="mt-4 w-full rounded-xl border border-slate-600 px-4 py-3 text-sm font-bold text-white transition hover:border-emerald-400 hover:text-emerald-300">{selectedStyle === style.id ? 'चुना गया डिज़ाइन' : 'यह डिज़ाइन चुनें'}</button></div>
            </article>
          ))}
        </div>
      </section>

      <section id="calculator" className="scroll-mt-6 py-10">
        <div className="mb-6"><p className="text-sm font-bold text-emerald-300">०३ / खर्च का अनुमान</p><h2 className="mt-2 text-3xl font-bold text-white">क्षेत्रफल और ईंटों की गणना</h2><p className="mt-2 text-slate-400">लंबाई और चौड़ाई भरें, अनुमान तुरंत देखें।</p></div>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-3xl p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-300">लंबाई फीट में<input type="number" min="0" step="0.1" value={length} onChange={(event) => setLength(event.target.value)} placeholder="जैसे २०" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-400" /></label>
              <label className="text-sm font-semibold text-slate-300">चौड़ाई फीट में<input type="number" min="0" step="0.1" value={width} onChange={(event) => setWidth(event.target.value)} placeholder="जैसे १५" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-400" /></label>
            </div>
            <label className="mt-4 block text-sm font-semibold text-slate-300">प्रति वर्ग फुट कीमत (₹, वैकल्पिक)<input type="number" min="0" step="1" value={pricePerSqft} onChange={(event) => setPricePerSqft(event.target.value)} placeholder="जैसे ५०" className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-950/70 px-4 py-3 text-white outline-none transition focus:border-emerald-400" /></label>
            <p className="mt-4 text-xs leading-5 text-slate-500">ईंटों की संख्या २०० × १०० मिमी के सामान्य ब्लॉक और ५% अतिरिक्त मात्रा के आधार पर है। असली मात्रा और कीमत उत्पाद तथा जगह के अनुसार बदल सकती है।</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="metric-card"><span className="text-sm text-slate-400">कुल क्षेत्रफल</span><strong className="mt-3 block text-3xl font-black text-white">{formatNumber(area, 2)} <span className="text-base font-semibold text-slate-400">वर्ग फुट</span></strong></div>
            <div className="metric-card"><span className="text-sm text-slate-400">५% अतिरिक्त सहित आवश्यक ईंटें</span><strong className="mt-3 block text-3xl font-black text-white">{formatNumber(quantity)}</strong></div>
            <div className="metric-card sm:col-span-2"><span className="text-sm text-slate-400">कुल अनुमानित खर्च</span><strong className="mt-3 block text-3xl font-black text-white">{estimate ? `₹${formatNumber(estimate, 2)}` : 'कीमत भरें'}</strong><span className="mt-2 block text-xs text-slate-500">यह केवल सामग्री का अनुमान है।</span></div>
          </div>
        </div>
      </section>

      <section className="my-12 rounded-3xl bg-emerald-300 p-6 text-slate-950 sm:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><p className="text-sm font-bold text-emerald-950/70">अगला कदम उठाएँ</p><h2 className="mt-2 text-3xl font-black">अपने प्रोजेक्ट की बात करें।</h2><p className="mt-2 max-w-xl text-slate-800">आपका चुना डिज़ाइन, नाप और अनुमानित खर्च संदेश में अपने आप जुड़ जाएगा।</p></div>
          <a href={makeWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800">WhatsApp पर ऑर्डर भेजें <span className="ml-2" aria-hidden="true">↗</span></a>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-2 border-t border-slate-700/70 py-6 text-sm text-slate-500 sm:flex-row"><span>© {new Date().getFullYear()} Smart Block. आपके बेहतर आँगन के लिए।</span><a className="text-slate-400 hover:text-emerald-300" href={makeWhatsAppUrl()} target="_blank" rel="noreferrer">हमसे WhatsApp पर संपर्क करें</a></footer>
    </main>
  );
}
