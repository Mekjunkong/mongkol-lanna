"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { collections, lifeChapters, moods } from "@/content/mock-data";
import { ART_DIRECTION_CHOICE_KEY, ART_DIRECTION_OUTPUT_KEY, parsePersistedChoices } from "@/domains/story/client-storage";
import { interpretStory } from "@/domains/story/interpreter";
import { ArtworkComposition, artworkStudySources } from "./artwork-composition";

type Draft = { chapter?: string; story?: string; collection?: string; mood?: string; name?: string; specialDate?: string; birthday?: string };
const stages = ["Life Chapter", "Collection", "Mood", "Personal Details"] as const;
const initial: Draft = {};
const subscribeToChoices = (onStoreChange: () => void) => {
  window.addEventListener("storage", onStoreChange);
  return () => window.removeEventListener("storage", onStoreChange);
};
const getChoiceSnapshot = () => localStorage.getItem(ART_DIRECTION_CHOICE_KEY);
const getServerChoiceSnapshot = () => null;

function sentenceCount(value: string) {
  return value.split(/[.!?。！？]+|\n+/u).map((part) => part.trim()).filter(Boolean).length;
}

export function CommissionWizard() {
  const choiceSnapshot = useSyncExternalStore(subscribeToChoices, getChoiceSnapshot, getServerChoiceSnapshot);
  const saved = useMemo(() => parsePersistedChoices(choiceSnapshot), [choiceSnapshot]);
  return <CommissionWizardForm key={choiceSnapshot ?? "new-direction"} initialDraft={saved?.choices ?? initial} initialStep={saved?.step ?? 0} />;
}

function CommissionWizardForm({ initialDraft, initialStep }: { initialDraft: Draft; initialStep: number }) {
  const router = useRouter();
  const [step, setStep] = useState(initialStep);
  const [draft, setDraft] = useState<Draft>(initialDraft);

  useEffect(() => {
    localStorage.removeItem("mongkol-art-direction-v4");
    const choices = { chapter: draft.chapter, collection: draft.collection, mood: draft.mood };
    localStorage.setItem(ART_DIRECTION_CHOICE_KEY, JSON.stringify({ step, choices }));
  }, [draft.chapter, draft.collection, draft.mood, step]);

  const update = (key: keyof Draft, value: string) => setDraft((current) => ({ ...current, [key]: value }));
  const storySentences = sentenceCount(draft.story ?? "");
  const valid = [Boolean(draft.chapter) && storySentences <= 5, Boolean(draft.collection), Boolean(draft.mood), true][step];
  const selectedTone = useMemo(() => collections.find((item) => item.id === draft.collection)?.tone ?? "new-dawn", [draft.collection]);
  const next = () => {
    if (step < stages.length - 1) return setStep((current) => current + 1);
    const direction = interpretStory({ chapter: draft.chapter, story: draft.story ?? "", collection: draft.collection, mood: draft.mood });
    localStorage.setItem(ART_DIRECTION_OUTPUT_KEY, JSON.stringify(direction));
    router.push("/blueprint/art-direction-demo");
  };

  return (
    <div className="wizard-shell">
      <aside className="wizard-visual">
        <ArtworkComposition tone={selectedTone} title="Demonstration artwork study for Art Direction" />
        <p>DEMONSTRATION ARTWORK STUDY · Your choices shape an Art Direction only. No artwork is generated and no payment begins here.</p>
      </aside>
      <section className="wizard-panel" aria-labelledby="wizard-title">
        <header className="wizard-progress">
          <Link className="wizard-brand" href="/" aria-label="Back to home">ML</Link>
          <div><p>Step {step + 1} of exactly 4 · {stages[step]}</p><progress value={step + 1} max={4}>{step + 1}/4</progress></div>
          <span aria-live="polite">Choices saved locally</span>
        </header>

        <div className="wizard-content">
          <p className="eyebrow">YOUR STORY BEFORE SYMBOLS · 0{step + 1}</p>
          {step === 0 && (
            <fieldset>
              <legend id="wizard-title">Which life chapter are you in?</legend>
              <p className="step-intro">Choose one chapter, then add an optional story in one to five sentences. You do not need art vocabulary.</p>
              <div className="choice-list compact-choices">
                {lifeChapters.map((item, index) => <Choice key={item.id} name="chapter" value={draft.chapter} id={item.id} label={item.label} detail={`${item.th} · ${item.note}`} tone={("new-dawn" as keyof typeof artworkStudySources)} index={index} onChange={(value) => update("chapter", value)} />)}
              </div>
              <label className="story-field">
                <span>Your story <small>Optional, 1–5 sentences</small></span>
                <textarea maxLength={800} rows={5} value={draft.story ?? ""} onChange={(event) => update("story", event.target.value)} placeholder="A moment, relationship, place, or change you want the artwork to hold…" />
                <small className={storySentences > 5 ? "field-error" : ""}>{storySentences} / 5 sentences · {(draft.story ?? "").length} / 800 characters</small>
              </label>
            </fieldset>
          )}
          {step === 1 && <ChoiceStep title="Choose the world of your artwork" intro="Each collection sets the landscape, light, and visual rhythm. Collection names describe artistic worlds, not religious or historical claims." name="collection" value={draft.collection} options={collections} onChange={(value) => update("collection", value)} />}
          {step === 2 && <ChoiceStep title="How should the artwork feel?" intro="One mood keeps the palette, space, and movement coherent." name="mood" value={draft.mood} options={moods.map((item) => ({ ...item, note: item.th }))} onChange={(value) => update("mood", value)} />}
          {step === 3 && (
            <div>
              <h1 id="wizard-title">Add personal details, if you wish</h1>
              <p className="step-intro">These details are optional presentation metadata. They never enter the artwork prompt and create no astrological or sacred meaning.</p>
              <div className="personal-fields">
                <label><span>Name <small>Optional</small></span><input value={draft.name ?? ""} maxLength={80} onChange={(event) => update("name", event.target.value)} autoComplete="name" /></label>
                <label><span>Special date <small>Optional</small></span><input type="date" value={draft.specialDate ?? ""} onChange={(event) => update("specialDate", event.target.value)} /></label>
                <label><span>Birthday <small>Optional</small></span><input type="date" value={draft.birthday ?? ""} onChange={(event) => update("birthday", event.target.value)} /></label>
              </div>
              <aside className="privacy-note"><strong>Kept private and temporary</strong><p>Your raw story, name, and dates remain only in this open page. They are not saved to browser storage, sent to an image provider, or converted into predictions.</p></aside>
            </div>
          )}
        </div>

        <footer className="wizard-actions">
          <button className="button button--quiet" onClick={() => step ? setStep((current) => current - 1) : router.push("/")}><span>←</span> Back</button>
          <button className="button" disabled={!valid} onClick={next}>{step === 3 ? "Create My Art Direction" : "Continue"} <span>→</span></button>
        </footer>
      </section>
    </div>
  );
}

type ChoiceOption = { id: string; label: string; note: string; th?: string; tone: keyof typeof artworkStudySources };

function ChoiceStep({ title, intro, name, value, options, onChange }: { title: string; intro: string; name: string; value?: string; options: readonly ChoiceOption[]; onChange: (value: string) => void }) {
  return <fieldset><legend id="wizard-title">{title}</legend><p className="step-intro">{intro}</p><div className="choice-list">{options.map((item, index) => <Choice key={item.id} name={name} value={value} id={item.id} label={item.label} detail={`${item.th ? `${item.th} · ` : ""}${item.note}`} tone={item.tone} index={index} onChange={onChange} />)}</div></fieldset>;
}

function Choice({ name, value, id, label, detail, tone, index, onChange }: { name: string; value?: string; id: string; label: string; detail: string; tone: keyof typeof artworkStudySources; index: number; onChange: (value: string) => void }) {
  return <label className={`choice ${value === id ? "choice--selected" : ""}`} key={id}><Image className="choice__thumb" src={artworkStudySources[tone]} alt="" width={58} height={58} /><input type="radio" name={name} value={id} checked={value === id} onChange={() => onChange(id)} /><span className="choice__number">{String(index + 1).padStart(2, "0")}</span><span className="choice__copy"><strong>{label}</strong><small>{detail}</small></span><span className="choice__check">✓</span></label>;
}
