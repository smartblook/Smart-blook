import { useMemo, useState } from 'react';

const WHATSAPP_NUMBER = '919812185001';
const IMAGE_IDS = [
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600566753086-00f18fb6b3ea',
  'photo-1600607687920-4e2a09cf159d',
  'photo-1600566753190-17f0baa2a6c3',
  'photo-1600607687644-c7171b42498f',
  'photo-1600585152915-d208bec867a1',
  'photo-1600566752355-35792bedcfea',
  'photo-1600607687920-4e2a09cf159d',
  'photo-1600566753190-17f0baa2a6c3',
];

const DESIGN_STYLES = [
  { name: 'आधुनिक आँगन', detail: 'खुला, रोशनी से भरा और सुकूनभरा घर', label: 'आँगन' },
  { name: 'समकालीन निवास', detail: 'साफ़ रेखाएँ और संतुलित बाहरी रूप', label: 'समकालीन' },
  { name: 'हरा-भरा घर', detail: 'प्रकृति के करीब, आरामदायक जीवन', label: 'हरित' },
  { name: 'शाही प्रवेश', detail: 'मेहमानों के स्वागत के लिए आकर्षक प्रवेश', label: 'प्रवेश' },
  { name: 'सुकून का कोना', detail: 'परिवार के साथ बिताने के लिए सुंदर जगह', label: 'सुकून' },
  { name: 'खुला बरामदा', detail: 'हवादार बैठने की जगह और सुंदर विस्तार', label: 'बरामदा' },
  { name: 'आधुनिक मुखौटा', detail: 'सादगी में खास पहचान वाला बाहरी डिज़ाइन', label: 'मुखौटा' },
  { name: 'परिवार का घर', detail: 'रोज़मर्रा के लिए सहज और स्वागतपूर्ण', label: 'परिवार' },
  { name: 'सूरजमुखी निवास', detail: 'कुदरती रोशनी के साथ खुशनुमा बनावट', label: 'रोशनी' },
  { name: 'नया अंदाज़', detail: 'पारंपरिक गर्माहट और आधुनिक सोच का मेल', label: 'नया अंदाज़' },
];

const OPTIONS = [
  { size: 20, count: 20, prefix: '२० गज' },
  { size: 30, count: 30, prefix: '३० गज' },
  { size: 50, count: 50, prefix: '५० गज' },
].flatMap(({ size, count, prefix }) =>
  Array.from({ length: count }, (_, index) => {
    const style = DESIGN_STYLES[index % DESIGN_STYLES.length];
    return {
      id: `${size}-${index + 1}`,
      size,
      number: index + 1,
      title: `${prefix} ${style.name} ${String(index + 1).padStart(2, '0')}`,
      detail: style.detail,
      label: style.label,
      image: `https://images.unsplash.com/${IMAGE_IDS[index % IMAGE_IDS.length]}?auto=format&fit=crop&w=960&q=80`,
      tone: index % 5,
    };
  }),
);

function whatsappUrl(design) {
  const liked = design ? `मुझे “${design.title}” डिज़ाइन पसंद आया।` : 'मैं प्लॉट और बिल्डिंग के डिज़ाइन देखना चाहता/चाहती हूँ।';
  const message = `नमस्ते! ${liked}\nकृपया इस डिज़ाइन की जानकारी के लिए मुझसे संपर्क करें।`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function WhatsAppIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="whatsapp-icon"><path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.6 4.1 1.6 5.9L.2 24l6.5-1.7a11.8 11.8 0 0 0 5.4 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6-3.5-8.3ZM12.1 21.6c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.9 1 1-3.8-.3-.4a9.7 9.7 0 0 1-1.5-5.1c0-5.4 4.5-9.9 10-9.9 2.6 0 5.1 1 7 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.5 9.8-9.9 9.8Zm5.5-7.4c-.3-.2-1.7-.9-2-1s-.5-.2-.7.2-.8 1-1 1.2-.4.2-.7.1a8.1 8.1 0 0 1-2.4-1.5 9 9 0 0 1-1.7-2.1c-.2-.4 0-.5.2-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-.9-2.1c-.2-.5-.5-.4-.7-.4h-.6c-.2 0-.6.1-.9.4-.3.4-1.2 1.1-1.2 2.7s1.2 3.1 1.4 3.3c.2.2 2.3 3.5 5.6 4.8.8.4 1.5.6 2 .7.8.2 1.6.2 2.2.1.7-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4Z" /></svg>;
}

function DesignCard({ design, onSelect }) {
  const [imageFailed, setImageFailed] = useState(false);
  return (
    <article className={`design-card tone-${design.tone}`}>
      <div className="design-image">
        <div className="image-fallback" aria-hidden="true"><span>{design.label}</span></div>
        {!imageFailed && <img src={design.image} alt={`${design.title} का घर और बाहरी डिज़ाइन`} loading="lazy" onError={() => setImageFailed(true)} />}
        <span className="design-badge">{design.size} गज</span>
        <span className="image-caption">डिज़ाइन {String(design.number).padStart(2, '0')}</span>
      </div>
      <div className="design-info">
        <div><p className="eyebrow">प्लॉट व बिल्डिंग डिज़ाइन</p><h3>{design.title}</h3><p className="design-description">{design.detail}</p></div>
        <a className="card-cta" href={whatsappUrl(design)} target="_blank" rel="noopener noreferrer" aria-label={`${design.title} के बारे में WhatsApp पर पूछें`} onClick={() => onSelect(design)}>
          जानकारी पूछें <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}

export default function App() {
  const [activeSize, setActiveSize] = useState(20);
  const [selectedDesign, setSelectedDesign] = useState(OPTIONS[0]);
  const [showAll, setShowAll] = useState(false);
  const designs = useMemo(() => OPTIONS.filter((design) => design.size === activeSize), [activeSize]);
  const visibleDesigns = showAll ? designs : designs.slice(0, 8);

  function chooseSize(size) {
    setActiveSize(size);
    setShowAll(false);
    setSelectedDesign(OPTIONS.find((design) => design.size === size));
  }

  return (
    <main id="home">
      <header className="site-header shell">
        <a className="brand" href="#home" aria-label="स्मार्ट ब्लॉक — होम"><span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span><span className="brand-copy"><strong>स्मार्ट ब्लॉक</strong><small>आपके सपनों का घर, आपकी पसंद</small></span></a>
        <nav className="desktop-nav" aria-label="मुख्य नेविगेशन"><a href="#designs">डिज़ाइन देखें</a><a href="#about">हमारी खासियत</a></nav>
        <a className="button button-dark header-cta" href={whatsappUrl(selectedDesign)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> बात करें</a>
      </header>

      <section className="hero shell">
        <div className="hero-copy">
          <span className="kicker"><span className="kicker-dot" /> आपके प्लॉट के लिए सोच-समझकर बने डिज़ाइन</span>
          <h1>घर की कल्पना से<br /><span>हकीकत तक।</span></h1>
          <p>अपने प्लॉट के आकार के अनुसार घर और बाहरी डिज़ाइन खोजें। जो पसंद आए, उसकी जानकारी सीधे WhatsApp पर पाएँ।</p>
          <div className="hero-actions"><a className="button button-primary" href="#designs">डिज़ाइन देखना शुरू करें <span aria-hidden="true">↓</span></a><a className="text-link" href={whatsappUrl(selectedDesign)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> सीधे पूछें</a></div>
          <div className="hero-trust"><span className="trust-icon">✳</span><span>साफ़-सुथरे विकल्प</span><i /><span>आपकी पसंद, आपकी बातचीत</span></div>
        </div>
        <div className="hero-art" aria-label="आधुनिक घर का प्रेरणादायक दृश्य">
          <div className="hero-photo" role="img" aria-label="हरियाली के बीच आधुनिक घर" />
          <div className="hero-photo-shade" />
          <div className="floating-note"><span className="note-icon">⌂</span><span><strong>आपका अगला घर</strong><small>एक सही डिज़ाइन से शुरू</small></span><span className="note-arrow">↗</span></div>
          <div className="hero-number"><strong>१००</strong><span>डिज़ाइन<br />विकल्प</span></div>
          <span className="hero-orbit orbit-one" /><span className="hero-orbit orbit-two" />
        </div>
      </section>

      <section className="intro shell" id="about">
        <div><p className="eyebrow">आपके सपनों के घर की शुरुआत</p><h2>पहले पसंद करें।<br /><span>फिर बात करें।</span></h2></div>
        <p>हर प्लॉट की अपनी ज़रूरत होती है। इसलिए यहाँ अलग-अलग आकार के प्लॉट के लिए तैयार डिज़ाइन विकल्प हैं—ताकि आप आराम से देख सकें, अपनी पसंद चुन सकें और आगे की जानकारी सीधे हमारी टीम से पा सकें।</p>
      </section>

      <section className="catalog shell" id="designs">
        <div className="section-heading"><div><p className="eyebrow">डिज़ाइन संग्रह</p><h2>आपके प्लॉट के लिए<br className="mobile-break" /> एक नया नज़रिया</h2></div><p>अपना प्लॉट चुनें और पसंदीदा डिज़ाइन देखें।</p></div>
        <div className="size-tabs" role="tablist" aria-label="प्लॉट का आकार चुनें">
          {[{ size: 20, label: '२० गज', count: '२० डिज़ाइन' }, { size: 30, label: '३० गज', count: '३० डिज़ाइन' }, { size: 50, label: '५० गज', count: '५० डिज़ाइन' }].map((tab) => <button key={tab.size} type="button" role="tab" aria-selected={activeSize === tab.size} className={`size-tab ${activeSize === tab.size ? 'active' : ''}`} onClick={() => chooseSize(tab.size)}><strong>{tab.label}</strong><span>{tab.count}</span></button>)}
        </div>
        <div className="catalog-meta"><span><strong>{activeSize} गज</strong> के लिए चुनिंदा डिज़ाइन</span><span>{designs.length} विकल्प</span></div>
        <div className="design-grid">{visibleDesigns.map((design) => <DesignCard key={design.id} design={design} onSelect={setSelectedDesign} />)}</div>
        {designs.length > 8 && <button className="button button-outline more-button" type="button" onClick={() => setShowAll((value) => !value)}>{showAll ? 'कम डिज़ाइन दिखाएँ' : `सभी ${designs.length} डिज़ाइन देखें`} <span aria-hidden="true">{showAll ? '↑' : '↓'}</span></button>}
      </section>

      <section className="contact-band shell">
        <div className="contact-content"><span className="contact-icon"><WhatsAppIcon /></span><div><p className="eyebrow">आपकी पसंद का अगला कदम</p><h2>कोई डिज़ाइन पसंद आया?</h2><p>हमें WhatsApp पर बताइए—हम आपकी पसंद के डिज़ाइन की जानकारी देने के लिए संपर्क करेंगे।</p></div></div>
        <a className="button button-light" href={whatsappUrl(selectedDesign)} target="_blank" rel="noopener noreferrer"><WhatsAppIcon /> WhatsApp पर जानकारी लें <span aria-hidden="true">↗</span></a>
      </section>

      <footer className="site-footer shell"><a className="brand footer-brand" href="#home"><span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span><span className="brand-copy"><strong>स्मार्ट ब्लॉक</strong><small>घर, आपकी पसंद</small></span></a><span>आपके घर के सपनों के लिए, एक बेहतर शुरुआत।</span><span>© {new Date().getFullYear()} स्मार्ट ब्लॉक</span></footer>
      <a className="mobile-whatsapp" href={whatsappUrl(selectedDesign)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp पर जानकारी लें"><WhatsAppIcon /></a>
    </main>
  );
}
