/**
 * Trust content filled in by Vitaminkorgen. Empty lists stay hidden on the
 * site, so nothing made-up is ever shown. Add real entries only.
 */
export const trust = {
  /** Link to the Google Business profile, e.g. "https://g.page/r/...". Empty = no link. */
  googleProfileUrl: "",
  stats: [
    { value: "150+", label: "företag sedan 2021" },
    { value: "5/5", label: "på Google" },
  ],
  /** Customer logos: { name, src } — src is an image path or URL. */
  logos: [] as { name: string; src: string }[],
  /** Real customer reviews: { quote, name, company }. */
  reviews: [] as { quote: string; name: string; company: string }[],
};
