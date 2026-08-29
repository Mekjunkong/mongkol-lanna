import type { ArtworkPresentation } from "@/domains/artwork/presentation";

export function ArtPassport({ art }: { art: ArtworkPresentation }) {
  return <section className="art-passport" id="passport">
    <header><div><p className="eyebrow">MONGKOL ART PASSPORT</p><h2>{art.title}</h2></div><span>DEMONSTRATION<br />NOT A CUSTOMER COMMISSION</span></header>
    <dl>
      <div><dt>Commission number</dt><dd>{art.commissionNumber}</dd></div><div><dt>Created date</dt><dd>{art.createdDate}</dd></div>
      <div><dt>Life chapter</dt><dd>{art.chapter}</dd></div><div><dt>Collection</dt><dd>{art.collection}</dd></div>
      <div><dt>Edition</dt><dd>{art.edition}</dd></div><div><dt>Palette</dt><dd>{art.palette}</dd></div>
      <div className="passport-wide"><dt>Art Direction</dt><dd>{art.artDirection}</dd></div><div className="passport-wide"><dt>Composition</dt><dd>{art.composition}</dd></div>
      <div><dt>Hero</dt><dd>{art.hero}</dd></div><div><dt>Support</dt><dd>{art.support.join(", ")}</dd></div>
      <div className="passport-wide"><dt>Short story</dt><dd>{art.shortStory}</dd></div>
      <div className="passport-wide"><dt>Cultural notes</dt><dd><b>Cultural Reference:</b> contemporary observation of northern landscape and botanical material. No historical or sacred meaning is claimed.</dd></div>
      <div className="passport-wide"><dt>Artistic interpretation</dt><dd>{art.symbolism}. This is an artistic and personal reading, not a religious, astrological, or supernatural statement.</dd></div>
    </dl>
    <footer><p>Print-friendly demonstration record · P0 mock state</p><button className="button button--quiet passport-print" type="button" onClick={() => window.print()}>Print Art Passport</button></footer>
  </section>;
}
