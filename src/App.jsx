import { useEffect, useState } from 'react';

const styles = [
  { id: 'plain', name: 'सादा बिछाव', description: 'आँगन और रास्तों के लिए सादा और टिकाऊ नमूना।', className: 'pattern-plain' },
  { id: 'zigzag', name: 'ज़िगज़ैग बिछाव', description: 'मज़बूत पकड़ देने वाला जुड़ी ईंटों का नमूना।', className: 'pattern-zigzag' },
  { id: 'designer', name: 'सजावटी बिछाव', description: 'बाहरी जगह को सुंदर रूप देने वाला नमूना।', className: 'pattern-designer' },
];

const BLOCK_AREA_SQFT = (200 * 100 / 1_000_000) * 10.7639;
const WHATSAPP_NUMBER = '919812185001';
const numberFormat = new Intl.NumberFormat('hi-IN-u-nu-deva', { maximumFractionDigits: 2 });

function formatNumber(value) {
  return numberFormat.format(value);
}

function positiveNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : 0;
}

export default function App() {
  const [selectedStyle, setSelectedStyle] = useState('plain');
  const [photo, setPhoto] = useState('');
  const [photoError, setPhotoError] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [pricePerSqft, setPricePerSqft] = useState('');

  useEffect(() => {
    return () => {
      if (photo) URL.revokeObjectURL(photo);
    };
  }, [photo]);

  const selectedBlock = styles.find((style) => style.id === selectedStyle) ?? styles[0];
  const lengthValue = positiveNumber(length);
  const widthValue = positiveNumber(width);
  const priceValue = positiveNumber(pricePerSqft);
  const area = lengthValue * widthValue;
  const quantity = area ? Math.ceil(area / BLOCK_AREA_SQFT * 1.05) : 0;
  const estimate = area && priceValue ? area * priceValue : 0;

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    setPhotoError('');
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setPhotoError('कृपया चित्र वाली फ़ाइल चुनें।');
      event.target.value = '';
      return;
    }
    setPhoto(URL.createObjectURL(file));
    event.target.value = '';
  }

  function makeWhatsAppUrl() {
    const message = [
      'नमस्ते! मुझे फ़र्श की ईंटों के बारे में जानकारी चाहिए।',
      `चुना हुआ बिछाव: ${selectedBlock.name}`,
      area
        ? `क्षेत्रफल: ${formatNumber(area)} वर्ग फुट (${formatNumber(lengthValue)} × ${formatNumber(widthValue)} फुट)`
        : 'क्षेत्रफल: कृपया गणना में मेरी मदद करें।',
      quantity ? `५% अतिरिक्त सहित अनुमानित ईंटें: ${formatNumber(quantity)}` : '',
      estimate ? `अनुमानित खर्च: ₹${formatNumber(estimate)}` : 'प्रति वर्ग फुट कीमत अभी नहीं भरी गई है।',
    ].filter(Boolean).join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  return (
    <main id="home" className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/70 pb-5">
        <a href="#home" className="flex items-center gap-3 text-white no-underline" aria-label="स्मार्ट ब्लॉक का मुख्य पृष्ठ">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-emerald-400 text-xl font-black text-slate-950" aria-hidden="true">▦</span>
          <span><span className="block text-lg font-bold">स्मार्ट ब्लॉक</span><span className="block text-xs text-slate-400">फ़र्श की ईंटों के नमूने</span></span>
        </a>
        <a href={makeWhatsAppUrl()} target="_blank" rel="noreferrer" className="rounded-full bg-emerald-400 px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-emerald-300">
          व्हाट्सऐप पर बात करें
        </a>
      </header>

      <section className="grid items-center gap-10 py-12 md:grid-cols-2 md:py-20">
        <div>
          <p className="mb-4 text-sm font-bold text-emerald-300">सोचें · देखें · बनवाएँ</p>
          <h1 className="max-w-2xl text-4xl font-black leading-tight text-white sm:text-5xl">अपने नए आँगन को पहले देखकर चुनें</h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">अपनी जगह का चित्र लगाएँ, ईंटों के अलग-अलग बिछाव देखें और ज़रूरी मात्रा का अनुमान पाएँ।</p>
          <a href="#visualizer" className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-100">नमूना देखना शुरू करें</a>
        </div>
        <div className="glass-panel rounded-3xl p-4 sm:p-6">
          <div className="relative h-64 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 sm:h-80">
            <div className="pattern-plain absolute inset-0 opacity-60" />
            <div className="absolute bottom-5 left-5 rounded-xl border border-white/15 bg-slate-950/75 px-4 py-3 backdrop-blur">
              <span className="block text-xs text-slate-300">आपकी जगह, नया रूप</span>
              <span className="font-semibold text-white">बनवाने से पहले नमूना देखें</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-300">देखने के लिए तीन बिछाव उपलब्ध हैं।</p>
        </div>
      </section>

      <section id="visualizer" className="scroll-mt-6 py-8">
        <div className="mb-6">
          <p className="text-sm font-bold text-emerald-300">०१ / अपनी जगह पर नमूना</p>
          <h2 className="mt-2 text-3xl font-bold text-white">अपनी जगह का रूप देखकर चुनें</h2>
          <p className="mt-2 text-slate-400">अपनी ज़मीन या आँगन का चित्र चुनें और अलग-अलग बिछाव देखें।</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
          <div className="glass-panel rounded-3xl p-4 sm:p-6">
            <div className="relative flex min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-slate-800 sm:min-h-96">
              {photo ? <img src={photo} alt="आपकी जगह का चित्र" className="absolute inset-0 h-full w-full object-cover" /> : <p className="px-6 text-center text-slate-300">अपनी जगह का चित्र चुनें या नमूना बिछाव देखें।</p>}
              <div aria-label={`${selectedBlock.name} का नमूना`} className={`paver-overlay pointer-events-none absolute inset-0 ${selectedBlock.className}`} />
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">{selectedBlock.name}</span>
            </div>
            <label className="mt-4 inline-flex cursor-pointer items-center justify-center rounded-xl border border-slate-600 px-4 py-3 text-sm font-semibold text-white transition hover:border-emerald-300">
              {photo ? 'दूसरा चित्र चुनें' : 'अपनी जगह का चित्र चुनें'}
              <input className="sr-only" type="file" accept="image/*" onChange={handlePhotoChange} />
            </label>
            {photoError && <p role="alert" className="mt-2 text-sm text-rose-300">{photoError}</p>}
          </div>
          <aside className="glass-panel rounded-3xl p-5 sm:p-6">
            <h3 className="text-lg font-bold text-white">ईंटों का बिछाव चुनें</h3>
            <div className="mt-4 space-y-3">
              {styles.map((style) => (
                <button key={style.id} type="button" onClick={() => setSelectedStyle(style.id)} aria-pressed={selectedStyle === style.id} className={`w-full rounded-2xl border p-4 text-left transition ${selectedStyle === style.id ? 'border-emerald-300 bg-emerald-300/10' : 'border-slate-700 hover:border-slate-500'}`}>
                  <span className="flex items-center justify-between"><span className="font-bold text-white">{style.name}</span><span className={`h-5 w-5 rounded-full ${style.className}`} aria-hidden="true" /></span>
                  <span className="mt-1 block text-sm leading-5 text-slate-300">{style.description}</span>
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs leading-5 text-slate-400">यह केवल देखने के लिए नमूना है। असली रंग और नाप अलग हो सकते हैं।</p>
          </aside>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-6 py-12">
        <div className="mb-6">
          <p className="text-sm font-bold text-emerald-300">०२ / खर्च का अनुमान</p>
          <h2 className="mt-2 text-3xl font-bold text-white">क्षेत्रफल और ईंटों की गणना</h2>
          <p className="mt-2 text-slate-400">लंबाई और चौड़ाई भरें; अनुमान तुरंत दिखेगा।</p>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="glass-panel rounded-3xl p-5 sm:p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-300">लंबाई (फुट में)<input type="number" min="0" step="0.1" value={length} onChange={(event) => setLength(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-white" placeholder="जैसे २०" /></label>
              <label className="text-sm font-semibold text-slate-300">चौड़ाई (फुट में)<input type="number" min="0" step="0.1" value={width} onChange={(event) => setWidth(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-white" placeholder="जैसे १५" /></label>
            </div>
            <label className="mt-4 block text-sm font-semibold text-slate-300">प्रति वर्ग फुट कीमत (₹ में, भरना ज़रूरी नहीं)<input type="number" min="0" step="0.01" value={pricePerSqft} onChange={(event) => setPricePerSqft(event.target.value)} className="mt-2 w-full rounded-xl border border-slate-600 bg-slate-950 px-4 py-3 text-white" placeholder="जैसे ५०" /></label>
            <p className="mt-4 text-xs leading-5 text-slate-400">ईंटों की संख्या २०० × १०० मिलीमीटर की ईंट और ५% अतिरिक्त मात्रा के अनुमान पर आधारित है।</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="metric-card"><span className="text-sm text-slate-300">कुल क्षेत्रफल</span><strong className="mt-3 block text-3xl font-black text-white">{formatNumber(area)} वर्ग फुट</strong></div>
            <div className="metric-card"><span className="text-sm text-slate-300">५% अतिरिक्त सहित ज़रूरी ईंटें</span><strong className="mt-3 block text-3xl font-black text-white">{formatNumber(quantity)}</strong></div>
            <div className="metric-card sm:col-span-2"><span className="text-sm text-slate-300">कुल अनुमानित खर्च</span><strong className="mt-3 block text-3xl font-black text-white">{estimate ? `₹${formatNumber(estimate)}` : 'कीमत भरें'}</strong></div>
          </div>
        </div>
      </section>

      <section className="my-12 rounded-3xl bg-emerald-300 p-6 text-slate-950 sm:p-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div><p className="text-sm font-bold text-emerald-950/70">अगला कदम उठाएँ</p><h2 className="mt-2 text-3xl font-black">अपने काम के लिए जानकारी पाएँ</h2><p className="mt-2">अपनी ज़रूरत हमें व्हाट्सऐप पर भेजें।</p></div>
          <a href={makeWhatsAppUrl()} target="_blank" rel="noreferrer" className="inline-flex shrink-0 items-center justify-center rounded-xl bg-green-700 px-6 py-4 font-bold text-white transition hover:bg-green-800">व्हाट्सऐप पर संदेश भेजें</a>
        </div>
      </section>

      <footer className="flex flex-col justify-between gap-2 border-t border-slate-700/70 py-6 text-sm text-slate-400 sm:flex-row"><span>© {new Date().getFullYear()} स्मार्ट ब्लॉक</span><span>फ़र्श की ईंटों के नमूने और अनुमान</span></footer>
    </main>
  );
}
