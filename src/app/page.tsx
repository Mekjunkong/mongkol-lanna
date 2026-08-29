import Link from "next/link";
import { ArtworkComposition } from "@/components/artwork-composition";
import { ArtworkGrid, CulturalNote, PackageList } from "@/components/editorial";
import { PageShell } from "@/components/site-shell";

export default function Home() {
  return (
    <PageShell>
      <section className="hero story-art-hero">
        <div className="hero__copy">
          <p className="eyebrow">PERSONAL LANNA STORY ART</p>
          <h1>Your story,<br />composed as<br />contemporary Lanna art.</h1>
          <p className="lead">Personal artwork inspired by Northern Thai visual traditions. Begin with a life chapter, then receive a free Art Direction before deciding whether to continue.</p>
          <p className="starting-range"><span>Starting test range</span><strong>฿390–590</strong><small>Editable P0 range, not a fixed price or commercial quote</small></p>
          <div className="button-row">
            <Link className="button" href="/create">Create My Art Direction <span>→</span></Link>
            <Link className="text-link" href="/gallery">See story art examples ↗</Link>
          </div>
        </div>
        <div className="hero__art">
          <ArtworkComposition tone="new-dawn" title="Demonstration Personal Lanna Story Art study" />
          <p className="art-caption"><span>DEMONSTRATION ARTWORK STUDY · NOT A CUSTOMER</span><span>STORY BEFORE SYMBOLS</span></p>
        </div>
        <aside className="hero__rail" aria-hidden="true"><span>ART DIRECTION BEFORE ARTWORK</span><i /></aside>
      </section>

      <section className="signal-strip" aria-label="What you do and receive">
        <div><span>01</span><strong>Tell us the chapter</strong><p>Four guided decisions, with an optional short story.</p></div>
        <div><span>02</span><strong>Receive a free Art Direction</strong><p>See narrative, hero, palette, composition, and boundaries first.</p></div>
        <div><span>03</span><strong>Choose whether to continue</strong><p>P0 artwork and checkout remain clearly simulated.</p></div>
      </section>

      <section className="process" id="process">
        <header><p className="eyebrow">DELIVERY WORKFLOW</p><h2>From a life chapter<br />to a personal artwork</h2></header>
        <ol>
          <li><span>01</span><h3>Share</h3><p>Choose your chapter, world, mood, and optional details.</p></li>
          <li><span>02</span><h3>Review</h3><p>Receive your free, deterministic Art Direction Blueprint.</p></li>
          <li><span>03</span><h3>Create</h3><p>Select a test package. P0 remains mock, with no charge or paid generation.</p></li>
          <li><span>04</span><h3>Receive</h3><p>Explore the artwork story, phone formats, downloads, and Art Passport.</p></li>
        </ol>
      </section>

      <section className="selected">
        <header><p className="eyebrow">PERSONAL COMMISSIONS · DEMONSTRATIONS</p><h2>Artwork first.<br />The story unfolds after.</h2><Link href="/gallery" className="text-link">Open the Story Gallery ↗</Link></header>
        <ArtworkGrid limit={3} />
      </section>

      <section className="atelier-statement" aria-labelledby="atelier-statement-title">
        <div className="atelier-shadow" aria-hidden="true"><i /><i /><i /></div>
        <p className="eyebrow">THE ATELIER</p>
        <h2 id="atelier-statement-title">Meaning is not added after the image.<br />It begins with the story.</h2>
        <div className="atelier-principles">
          <p><strong>Cultural Reference</strong> begins with observed Northern Thai landscape, craft, and visual heritage.</p>
          <p><strong>Artistic Interpretation</strong> shapes those references into a contemporary composition.</p>
          <p><strong>Personal Symbolism</strong> comes from your chapter, without supernatural guarantees or fabricated sacred writing.</p>
        </div>
      </section>

      <section className="story-fragments" aria-labelledby="story-fragments-title">
        <div className="fragment-field" aria-hidden="true">
          <span>Chapter</span><span>Intention</span><span>Place</span><span>Memory</span><span>Color</span><span>Symbol</span>
        </div>
        <div className="story-fragments__copy">
          <p className="eyebrow">STORY INPUTS</p>
          <h2 id="story-fragments-title">You bring the chapter.<br />We compose its visual language.</h2>
          <p>No prompt writing and no art vocabulary required. Four guided decisions are enough to begin.</p>
          <Link className="text-link" href="/create">Start with your story <span>→</span></Link>
        </div>
      </section>

      <section className="packages-section">
        <header><p className="eyebrow">THREE WAYS TO CONTINUE</p><h2>Choose the finish,<br />not a bundle of promises.</h2><p>These editable ranges are for P0 testing only. They are not fixed pricing and do not send a commercial quote.</p></header>
        <PackageList />
      </section>

      <CulturalNote />

      <section className="final-cta">
        <p className="eyebrow">FREE ART DIRECTION FIRST</p>
        <h2>Begin your personal artwork.</h2>
        <p>Tell us the chapter you are carrying. We will help compose its visual language.</p>
        <Link className="button button--light" href="/create">Create My Art Direction <span>→</span></Link>
      </section>
    </PageShell>
  );
}
