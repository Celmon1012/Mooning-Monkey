/** 6 purple ? cards — 3×2 grid with pink tree lines (matches target screenshot) */
export function GalacticGorillasPhase({ title }: { title: string }) {
  return (
    <section className="galactic-phase">
      <h2 className="quetion_mark_heading eval-gradient-text">{title}</h2>

      <div className="galactic-tree">
        <div className="galactic-cards">
          {[0, 1, 2].map((col) => (
            <div key={col} className="galactic-col">
              <span className="galactic-stub-up" aria-hidden />
              <span className="eval-q-card eval-q-card--galactic">?</span>
              <span className="galactic-stub-mid" aria-hidden />
              <span className="eval-q-card eval-q-card--galactic">?</span>
              <span className="galactic-stub-down" aria-hidden />
            </div>
          ))}
        </div>
        <div className="galactic-hbar" aria-hidden />
        <div className="galactic-center-stem" aria-hidden />
      </div>
    </section>
  );
}

/** 2 pink ? cards → connector → gradient yeti → title */
export function AlienYetiPhase({
  alienTitle,
  yetiTitle,
}: {
  alienTitle: string;
  yetiTitle: string;
}) {
  return (
    <section className="alien-yeti-phase">
      <h2 className="quetion_mark_heading eval-gradient-text">{alienTitle}</h2>

      <div className="alien-tree">
        <div className="alien-cards">
          <div className="alien-col">
            <span className="alien-stub-up" aria-hidden />
            <span className="eval-q-card eval-q-card--alien">?</span>
            <span className="alien-stub-down" aria-hidden />
          </div>
          <div className="alien-col">
            <span className="alien-stub-up" aria-hidden />
            <span className="eval-q-card eval-q-card--alien">?</span>
            <span className="alien-stub-down" aria-hidden />
          </div>
        </div>
        <div className="alien-hbar" aria-hidden />
        <div className="alien-center-stem" aria-hidden />
        <span className="eval-q-card eval-q-card--yeti">?</span>
      </div>

      <h2 className="Get_External_heading eval-gradient-text">{yetiTitle}</h2>
    </section>
  );
}
