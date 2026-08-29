import { ArtworkComposition } from "@/components/artwork-composition";
import { formatTestRange, PACKAGE_CONFIG } from "@/config/packages";

const controls = [
  ["Life Chapter", "New Beginning"], ["Narrative", "Opening toward a steady new field"], ["Collection", "Mountain & Mist"], ["Archetype", "Open Horizon"], ["Visual Metaphor", "Opening path"], ["Hero", "Layered mountain ridge"], ["Support", "Mist, teak leaves, narrow stream"], ["Palette", "Mist Jade"], ["Composition", "Low horizon, open upper-right"], ["Density", "Balanced"], ["Tradition Level", "Contemporary"], ["Prompt Version", "prompt-p0.1"], ["Provider", "mock"], ["Model", "deterministic-study"],
] as const;

export default function ArtLab() {
  return <section className="admin-page"><header><div><p className="admin-kicker">EXPERIMENT WORKSPACE · ALL MOCK</p><h1>Admin Art Lab</h1></div><button className="admin-button">Run Mock Study</button></header>
    <div className="lab-grid lab-grid--v4">
      <section className="lab-controls"><h2>Art Direction controls</h2>{controls.map(([label, value]) => <label key={label}>{label}{label === "Narrative" || label === "Support" ? <textarea defaultValue={value} rows={2} /> : <select defaultValue={value}><option>{value}</option></select>}</label>)}<aside><strong>Guard state: pass</strong><p>Thai + Lanna scope only. Raw customer story and personal details are excluded. Sacred automation and real providers are disabled.</p></aside></section>
      <section className="lab-result lab-result--v4">
        <div className="lab-art"><p className="admin-kicker">RESULT · MOCK ASSET</p><ArtworkComposition compact title="Mock Art Lab result" /></div>
        <div className="lab-output">
          <section><p className="admin-kicker">BLUEPRINT</p><h2>First Light</h2><dl><div><dt>Chapter</dt><dd>New Beginning</dd></div><div><dt>Collection</dt><dd>Mountain & Mist</dd></div><div><dt>Hero</dt><dd>Layered mountain ridge</dd></div><div><dt>Composition</dt><dd>Low horizon, open upper-right</dd></div></dl></section>
          <section><p className="admin-kicker">COMPILED PROMPT</p><code>MOUNTAIN_MIST; layered mountain ridge; quiet mist; low horizon; mist jade; contemporary Northern Thai and Lanna-inspired visual direction; no writing in artwork</code><small>Structured Blueprint fields only · no raw story, name, date, or birthday</small></section>
          <section className="lab-review-grid"><div><p className="admin-kicker">QA</p><div className="score"><strong>94</strong><span>SIMULATED<small>Review passed</small></span></div></div><dl><div><dt>Cost</dt><dd>฿0.00 · mock</dd></div><div><dt>Admin Rating</dt><dd>GOOD</dd></div><div><dt>Failure Tags</dt><dd>None</dd></div><div><dt>Automatic retry</dt><dd>0 of max 1</dd></div></dl></section>
        </div>
      </section>
    </div>
    <section className="admin-sheet package-admin"><div><p className="admin-kicker">PACKAGE CONFIG · packages-p0.1</p><h2>Editable P0 test ranges and entitlements</h2></div><table><thead><tr><th>Package</th><th>Test range</th><th>Deliverables</th><th>Art Direction Adjustment</th></tr></thead><tbody>{PACKAGE_CONFIG.map((item) => <tr key={item.id}><td><strong>{item.name}</strong><small>{item.active ? "Active in mock display" : "Inactive"}</small></td><td>{formatTestRange(item.range)}</td><td>{item.deliverables.join(" · ")}</td><td>{item.artDirectionAdjustments === 1 ? "Exactly one" : "None"}</td></tr>)}</tbody></table><p className="fine-print">Admin representation only. No live quote, checkout, or database mutation is connected.</p></section>
  </section>;
}
