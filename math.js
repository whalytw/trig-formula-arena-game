/* Local MathML renderer. No network, fonts, or third-party scripts required. */
(() => {
  const escape = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const names = {pi:'π',theta:'θ',alpha:'α',beta:'β',varphi:'φ',pm:'±',ne:'≠',le:'≤',ge:'≥',in:'∈',infty:'∞',cdot:'·',times:'×',R:'ℝ',Z:'ℤ'};
  function parse(source) {
    let i = 0;
    function group() {
      while (source[i] === ' ') i++;
      if (source[i] === '{') { i++; const s = sequence('}'); i++; return `<mrow>${s}</mrow>`; }
      return atom();
    }
    function atom() {
      const c = source[i++];
      if (c === undefined) return '<mrow></mrow>';
      if (c === '{') { const s = sequence('}'); i++; return `<mrow>${s}</mrow>`; }
      if (c === '\\') {
        const match = source.slice(i).match(/^[A-Za-z]+/); const cmd = match ? match[0] : source[i++];
        if (match) i += cmd.length;
        if (cmd === 'frac') return `<mfrac>${group()}${group()}</mfrac>`;
        if (cmd === 'sqrt') return `<msqrt>${group()}</msqrt>`;
        if (cmd === 'text') { while(source[i] === ' ') i++; i++; let t=''; while(i<source.length && source[i]!=='}') t+=source[i++]; i++; return `<mtext>${escape(t)}</mtext>`; }
        if (['sin','cos','tan'].includes(cmd)) return `<mi mathvariant="normal">${cmd}</mi>`;
        if (cmd === 'left' || cmd === 'right') return '';
        if (cmd === ',') return '<mspace width="0.2em"/>';
        const val = names[cmd] || cmd; return `<${['pi','theta','alpha','beta','varphi','R','Z'].includes(cmd)?'mi':'mo'}>${escape(val)}</${['pi','theta','alpha','beta','varphi','R','Z'].includes(cmd)?'mi':'mo'}>`;
      }
      if (/\d/.test(c)) { let s=c; while (/[\d.]/.test(source[i] || '!')) s+=source[i++]; return `<mn>${s}</mn>`; }
      if (/[a-zA-Z]/.test(c)) return `<mi>${c}</mi>`;
      if (c === ' ') return '';
      return `<mo>${escape(c === '-' ? '−' : c)}</mo>`;
    }
    function sequence(end) {
      let s='';
      while (i < source.length && source[i] !== end) {
        let a=atom();
        while (source[i] === '^' || source[i] === '_') { const tag=source[i++] === '^'?'msup':'msub'; a=`<${tag}>${a}${group()}</${tag}>`; }
        s+=a;
      }
      return s;
    }
    return sequence();
  }
  window.mathHTML = source => {
    const textOnly=source.match(/^\\text\{([^}]*)\}$/);
    if(textOnly)return `<span class="plain-math">${escape(textOnly[1])}</span>`;
    return `<math xmlns="http://www.w3.org/1998/Math/MathML" aria-label="${escape(source)}"><mrow>${parse(source)}</mrow></math>`;
  };
  window.escapeHTML = escape;
})();
