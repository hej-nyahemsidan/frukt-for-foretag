
export interface AreaInfo {
  slug: string;
  name: string;
  description: string;
  nearbyAreas: string[];
}

export const areas: AreaInfo[] = [
  { slug: 'ostermalm', name: 'Östermalm', description: 'Vi levererar färska fruktkorgar till kontor och företag på Östermalm. Snabb leverans i centrala Stockholm med handplockad kvalitetsfrukt.', nearbyAreas: ['Gärdet', 'Gamla stan', 'Södermalm'] },
  { slug: 'kungsholmen', name: 'Kungsholmen', description: 'Fruktkorgar till arbetsplatser på Kungsholmen. Vi levererar direkt till ert kontor med fri frakt – varje vecka.', nearbyAreas: ['Stadshagen', 'Fridhemsplan', 'Bromma'] },
  { slug: 'stadshagen', name: 'Stadshagen', description: 'Beställ fruktkorgar till kontoret i Stadshagen. Färsk, säsongsanpassad frukt levererad till er dörr.', nearbyAreas: ['Kungsholmen', 'Fridhemsplan', 'Solna'] },
  { slug: 'fridhemsplan', name: 'Fridhemsplan', description: 'Fruktkorgar med fri leverans till Fridhemsplan. Vi förser kontor i området med färsk frukt varje vecka.', nearbyAreas: ['Kungsholmen', 'Stadshagen', 'Gamla stan'] },
  { slug: 'sodermalm', name: 'Södermalm', description: 'Fruktkorgar till företag på Södermalm. Handplockad frukt levererad direkt till ert kontor – smidigt och enkelt.', nearbyAreas: ['Gamla stan', 'Hammarby sjöstad', 'Östermalm'] },
  { slug: 'nacka', name: 'Nacka', description: 'Vi levererar fruktkorgar till kontor och företag i Nacka. Färsk frukt varje vecka med gratis leverans.', nearbyAreas: ['Hammarby sjöstad', 'Tyresö', 'Södermalm'] },
  { slug: 'hammarby-sjostad', name: 'Hammarby sjöstad', description: 'Fruktkorgar till moderna kontor i Hammarby sjöstad. Hållbar, ekologisk frukt levererad till er arbetsplats.', nearbyAreas: ['Södermalm', 'Nacka', 'Farsta'] },
  { slug: 'solna', name: 'Solna', description: 'Beställ fruktkorgar till ert företag i Solna. Vi levererar färsk frukt till kontor i hela Solna med fri frakt.', nearbyAreas: ['Sundbyberg', 'Hagalund', 'Bromma'] },
  { slug: 'sundbyberg', name: 'Sundbyberg', description: 'Fruktkorgar till arbetsplatser i Sundbyberg. Vi levererar handplockad frukt direkt till kontoret varje vecka.', nearbyAreas: ['Solna', 'Hagalund', 'Bromma'] },
  { slug: 'hagalund', name: 'Hagalund', description: 'Färska fruktkorgar till kontor i Hagalund. Enkel beställning, fri leverans och alltid hög kvalitet.', nearbyAreas: ['Solna', 'Sundbyberg', 'Bromma'] },
  { slug: 'bromma', name: 'Bromma', description: 'Vi levererar fruktkorgar till företag i Bromma. Säsongens bästa frukt direkt till ert kontor.', nearbyAreas: ['Alvik', 'Sundbyberg', 'Kungsholmen'] },
  { slug: 'alvik', name: 'Alvik', description: 'Fruktkorgar med fri leverans till kontor i Alvik. Handplockad frukt av högsta kvalitet varje vecka.', nearbyAreas: ['Bromma', 'Kungsholmen', 'Sundbyberg'] },
  { slug: 'bandhagen', name: 'Bandhagen', description: 'Beställ fruktkorgar till arbetsplatsen i Bandhagen. Färsk frukt levererad till er dörr med gratis frakt.', nearbyAreas: ['Älvsjö', 'Hägersten', 'Farsta'] },
  { slug: 'alvsjo', name: 'Älvsjö', description: 'Fruktkorgar till kontor och företag i Älvsjö. Vi levererar färsk, handplockad frukt varje vecka.', nearbyAreas: ['Bandhagen', 'Hägersten', 'Västberga'] },
  { slug: 'hagersten', name: 'Hägersten', description: 'Vi levererar fruktkorgar till arbetsplatser i Hägersten. Enkel beställning och alltid fri leverans.', nearbyAreas: ['Västberga', 'Älvsjö', 'Fruängen'] },
  { slug: 'vastberga', name: 'Västberga', description: 'Fruktkorgar till företag i Västberga industriområde. Perfekt för kontor som vill erbjuda frukt på jobbet.', nearbyAreas: ['Hägersten', 'Älvsjö', 'Bandhagen'] },
  { slug: 'tumba', name: 'Tumba', description: 'Beställ fruktkorgar till kontoret i Tumba. Vi levererar färsk frukt med fri frakt till hela Botkyrka.', nearbyAreas: ['Salem', 'Botkyrka', 'Huddinge'] },
  { slug: 'salem', name: 'Salem', description: 'Fruktkorgar till företag i Salem. Handplockad säsongsfrukt levererad direkt till er arbetsplats.', nearbyAreas: ['Tumba', 'Botkyrka', 'Huddinge'] },
  { slug: 'botkyrka', name: 'Botkyrka', description: 'Vi levererar fruktkorgar till kontor i Botkyrka. Färsk frukt varje vecka med gratis leverans.', nearbyAreas: ['Tumba', 'Salem', 'Huddinge'] },
  { slug: 'tyreso', name: 'Tyresö', description: 'Fruktkorgar till arbetsplatser i Tyresö. Säsongens bästa frukt levererad med fri frakt.', nearbyAreas: ['Haninge', 'Nacka', 'Farsta'] },
  { slug: 'haninge', name: 'Haninge', description: 'Beställ fruktkorgar till ert företag i Haninge. Vi levererar färsk frukt till kontor i hela kommunen.', nearbyAreas: ['Handen', 'Jordbro', 'Tyresö'] },
  { slug: 'handen', name: 'Handen', description: 'Fruktkorgar med fri leverans till kontor i Handen. Handplockad kvalitetsfrukt varje vecka.', nearbyAreas: ['Haninge', 'Jordbro', 'Skogås'] },
  { slug: 'skogas', name: 'Skogås', description: 'Vi levererar fruktkorgar till företag i Skogås. Enkel beställning, fri frakt och premium frukt.', nearbyAreas: ['Farsta', 'Handen', 'Haninge'] },
  { slug: 'farsta', name: 'Farsta', description: 'Fruktkorgar till kontor i Farsta. Färsk, handplockad frukt levererad direkt till arbetsplatsen.', nearbyAreas: ['Sköndal', 'Bandhagen', 'Skogås'] },
  { slug: 'skondal', name: 'Sköndal', description: 'Beställ fruktkorgar till kontoret i Sköndal. Vi erbjuder fri leverans och hög kvalitet varje vecka.', nearbyAreas: ['Farsta', 'Bandhagen', 'Nacka'] },
  { slug: 'gardet', name: 'Gärdet', description: 'Fruktkorgar till arbetsplatser på Gärdet. Handplockad säsongsfrukt levererad till ert kontor.', nearbyAreas: ['Östermalm', 'Ropsten', 'Södermalm'] },
  { slug: 'ropsten', name: 'Ropsten', description: 'Vi levererar fruktkorgar till kontor vid Ropsten. Färsk frukt med fri leverans varje vecka.', nearbyAreas: ['Gärdet', 'Östermalm', 'Nacka'] },
  { slug: 'taby', name: 'Täby', description: 'Fruktkorgar till företag i Täby. Säsongens bästa frukt levererad med gratis frakt till ert kontor.', nearbyAreas: ['Arninge', 'Solna', 'Järfälla'] },
  { slug: 'arninge', name: 'Arninge', description: 'Beställ fruktkorgar till arbetsplatsen i Arninge. Vi levererar handplockad frukt med fri frakt.', nearbyAreas: ['Täby', 'Solna', 'Järfälla'] },
  { slug: 'jarfalla', name: 'Järfälla', description: 'Fruktkorgar till kontor i Järfälla. Färsk frukt levererad varje vecka med gratis leverans.', nearbyAreas: ['Sundbyberg', 'Solna', 'Bromma'] },
  { slug: 'fruangen', name: 'Fruängen', description: 'Vi levererar fruktkorgar till företag i Fruängen. Enkel beställning och alltid hög kvalitet.', nearbyAreas: ['Hägersten', 'Älvsjö', 'Västberga'] },
  { slug: 'gamla-stan', name: 'Gamla stan', description: 'Fruktkorgar till kontor i Gamla stan. Handplockad frukt levererad till hjärtat av Stockholm.', nearbyAreas: ['Södermalm', 'Östermalm', 'Kungsholmen'] },
  { slug: 'stockholm', name: 'Stockholm City', description: 'Fruktkorgar till kontor i centrala Stockholm. Vi levererar färsk frukt till företag i hela city med fri frakt.', nearbyAreas: ['Östermalm', 'Södermalm', 'Kungsholmen'] },
  { slug: 'huddinge', name: 'Huddinge', description: 'Beställ fruktkorgar till ert företag i Huddinge. Färsk säsongsfrukt med gratis leverans varje vecka.', nearbyAreas: ['Älvsjö', 'Tumba', 'Botkyrka'] },
  { slug: 'jordbro', name: 'Jordbro', description: 'Fruktkorgar till arbetsplatser i Jordbro. Vi levererar handplockad frukt med fri frakt.', nearbyAreas: ['Haninge', 'Handen', 'Skogås'] },
  { slug: 'lanna', name: 'Länna', description: 'Vi levererar fruktkorgar till kontor i Länna. Färsk frukt med fri leverans och hög kvalitet.', nearbyAreas: ['Haninge', 'Handen', 'Tyresö'] },
];

export const getAreaBySlug = (slug: string): AreaInfo | undefined => {
  return areas.find(a => a.slug === slug);
};
