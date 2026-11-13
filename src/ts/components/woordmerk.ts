/** Het woordmerk "BOS 2027 FEESTEN": de enige plek waar Hipstelvetica gebruikt wordt. */
export const woordmerk = (jaar: number, klasse = '', tag = 'span') =>
  `<${tag} class="c-woordmerk ${klasse}"><span class="c-woordmerk__rij"><span>Bos</span> <span class="c-woordmerk__jaar">${jaar}</span></span><span class="c-woordmerk__rij">Feesten</span></${tag}>`;
