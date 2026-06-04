import { useEffect, useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { LazyImage } from '../components/ui/LazyImage';
import { assets } from '../data/assets';
import {
  AlienYetiPhase,
  GalacticGorillasPhase,
} from '../components/evolution-lab/EvolutionTreePhases';
import {
  evolutionEarning,
  evolutionLabHero,
  evolutionRewardsTable,
  evolutionStageCards,
  evolutionTreeIntro,
  evolutionTreeSteps,
  evolveStageContent,
  rarityTip,
  type EvolveStage,
} from '../data/evolutionLab';
import '../styles/evolution-lab.css';

function ArrowConnector({ className = '' }: { className?: string }) {
  return (
    <svg
      className={`sidearrow ${className}`}
      viewBox="0 0 30 45"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path
        d="M4 4 L26 22.5 L4 41"
        stroke="#f832ec"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EvolveSlots({ stage }: { stage: EvolveStage }) {
  const border = assets.evolutionLab.nftBorder;
  const placeholder = assets.evolutionLab.nftPlaceholder;

  const slot = (key: string, className = 'border_img') => (
    <img key={key} className={className} src={border} alt="" />
  );

  const result = (
    <div className="ib_marLeft">
      <img className="ques_image" src={placeholder} alt="Evolved NFT" />
      <div className="button_container">
        <button type="button">Evolve</button>
      </div>
    </div>
  );

  if (stage === '2') {
    return (
      <div className="first_round_image">
        {slot('1')}
        {slot('2', 'border_img ones')}
        {slot('3', 'border_img ones')}
        {slot('4', 'border_img ones')}
        <ArrowConnector className="ones_ar" />
        {result}
      </div>
    );
  }

  if (stage === '3') {
    return (
      <div className="round_divTwo">
        <img className="border_img1" src={border} alt="" />
        <img className="border_img1 doted" src={border} alt="" />
        <img className="border_img1 doted" src={border} alt="" />
        <ArrowConnector className="doted" />
        <div className="ib_marLeft">
          <img className="ques_image3" src={placeholder} alt="Evolved NFT" />
          <div className="button_container buttonss_container">
            <button type="button">Evolve</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="images_divFolder">
      <img className="border_img2" src={border} alt="" />
      <img className="border_img2 brrr left_im" src={border} alt="" />
      <ArrowConnector className="arr" />
      <ArrowConnector className="arrs" />
      <div className="ib_marLeft">
        <img className="ques_image1" src={placeholder} alt="Evolved NFT" />
        <div className="button_container">
          <button type="button">Evolve</button>
        </div>
      </div>
    </div>
  );
}

const MONKEY_GRID_COLS = 6;
const MONKEY_GRID_ROWS = 4;

/** 6×4 column tree — matches reference Evaluation page layout */
function MonkeysTreeGrid({
  images,
  footerTitle,
}: {
  images: readonly string[];
  footerTitle?: string;
}) {
  return (
    <div className="eval-monkeys-columns-wrap">
      <div className="eval-monkeys-columns">
        {Array.from({ length: MONKEY_GRID_COLS }, (_, col) => (
          <div key={col} className="eval-monkey-column">
            {Array.from({ length: MONKEY_GRID_ROWS }, (_, row) => {
              const index = row * MONKEY_GRID_COLS + col;
              const src = images[index];
              if (!src) return null;
              return (
                <div key={row} className="eval-monkey-slot">
                  <div className="main-timeline">
                    <div className="timeline">
                      <div className="timeline-content">
                        <div className="timeline-year">
                          <LazyImage src={src} alt="" className="monkey_img" />
                        </div>
                      </div>
                    </div>
                  </div>
                  {row < MONKEY_GRID_ROWS - 1 && <div className="eval-monkey-connector-v" aria-hidden />}
                  {row === MONKEY_GRID_ROWS - 1 && (
                    <div className="eval-monkey-connector-down" aria-hidden />
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="Monkey_bottom_border" />
      {footerTitle && (
        <h2 className="quetion_mark_heading quetion_mark_heading--after-bar eval-gradient-text">
          {footerTitle}
        </h2>
      )}
    </div>
  );
}

export function EvolutionLabPage() {
  const [activeStage, setActiveStage] = useState<EvolveStage>('2');
  const stage = evolveStageContent[activeStage];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageStyle = {
    '--eval-page-bg': `url(${assets.evolutionLab.pageBg})`,
    '--eval-evolve-bg': `url(${assets.evolutionLab.evolveBg})`,
  } as CSSProperties;

  return (
    <div className="evaluation-page Evaluation_mainDiv" style={pageStyle}>
      {/* Hero */}
      <section className="Evaluation_section1">
        <div className="Evaluation_Innersection1">
          <h1 className="section1_h1 eval-gradient-text">{evolutionLabHero.title}</h1>
          <h3 className="section1_h3">{evolutionLabHero.subtitle}</h3>
          <h3 className="section1_h33">{evolutionLabHero.tagline}</h3>
          <h4 className="section1_h4">{evolutionLabHero.detail}</h4>
        </div>
      </section>

      {/* Stage cards — horizontal row like reference */}
      <section className="card_main_section2">
        <div className="cards_twos">
          {evolutionStageCards.map((card) => (
            <div key={card.stage} className="card_one_section2">
              <h4 className="h4_section2">Stage {card.stage}</h4>
              <LazyImage src={card.image} alt={card.name} className="monkey_section2" />
              <h4 className="h44_section2 eval-gradient-text">{card.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Evolve + tree + earning */}
      <section className="section3_main">
        <div className="section3_innerDiv">
          <div className="evolve_section3Div">
            <h3 className="evolve_section3 eval-gradient-text">EVOLVE NOW</h3>
            <h4 className="select_section3">
              Select the available evolution stage according to your Mooning Monkey NFT holding
              to process the evolution
            </h4>
          </div>

          <div className="active_stageButton">
            {(['2', '3', '4'] as const).map((id) => (
              <button
                key={id}
                type="button"
                className={`${id === '2' ? 'active_stage2' : 'active_stage22'} ${
                  activeStage === id ? 'activeBtn' : ''
                }`}
                onClick={() => setActiveStage(id)}
              >
                Stage {id}
              </button>
            ))}
          </div>

          <div className="box_mainDiv">
            <div className="box_textDiv">
              <div className="button_divMa">
                <h4 className="box_nftText eval-gradient-text">{stage.nftTitle}</h4>
                <div className="both_button">
                  <div className="buttons_container">
                    <button type="button">Connect Wallet</button>
                  </div>
                  <div className="buttons_container">
                    <Link to="/#buy" style={{ textDecoration: 'none' }}>
                      <button type="button">Buy Monkey</button>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="first_textDiv">
                <p className="order_text">
                  {stage.id === '2' && (
                    <>
                      In order to achieve the powerful <span className="gal">Galactic Gorilla</span>
                      , you&apos;ll have to sacrifice 4 of your current{' '}
                      <span className="gal">Mooning Monkeys</span> to depart into deep space and
                      surpass the obstacles they&apos;ll encounter on their way to the new planet.
                    </>
                  )}
                  {stage.id === '3' && (
                    <>
                      The <span className="gal">Alien Gorilla</span> is the{' '}
                      <span className="gal">KEY</span> to winning against the alien invader and
                      winning The Inter-Galactic War — you&apos;ll have to sacrifice{' '}
                      <span className="gal">3 Galactic Gorillas</span> in order to achieve such a
                      strong being and protect the species from extinction.
                    </>
                  )}
                  {stage.id === '4' && (
                    <>
                      Although <span className="gal">The Alien Gorilla</span> is extremely
                      powerful, it is still bound by the shackles of mortality… To guarantee the
                      survival of the <span className="gal">Mooning Monkey&apos;s Species AND</span>{' '}
                      make sure they do so with style… You&apos;ll need to sacrifice{' '}
                      <span className="gal">2 Of Your Alien Gorillas</span> to make{' '}
                      <span className="gal">1 Eternal Yeti</span> that will live forever on the
                      Blockchain and earn the highest possible levels of daily game rewards.
                    </>
                  )}
                </p>
                <p className="note_text">
                  <span className="gal">NOTE:</span> By clicking &quot;<span className="gal">Evolve</span>
                  &quot;, the <span>{stage.sacrificeLabel}</span> you&apos;ve chosen will be sent to a
                  Solana black hole wallet and disappear forever, however,{' '}
                  <span>EACH EVOLUTION</span> will make you more money in the{' '}
                  <span className="gal">Mooning Monkey Game.</span>
                </p>
              </div>

              <div className="evolve_process">
                <h4 className="strt_evolve eval-gradient-text">Start evolve process</h4>
              </div>

              <EvolveSlots stage={activeStage} />
            </div>
          </div>

          <p className="new-text-add">{rarityTip}</p>

          {/* Evolution tree */}
          <div className="tree_container">
            <h2 className="evolution_heading eval-gradient-text">{evolutionTreeIntro.title}</h2>
            <h5 className="Evolution_text">
              In order to achive evolution,earn and spot among the 500 prestigious{' '}
              <span className="gal">Eternal Yeti</span> holder&apos;s circle ,and receive the highest
              possible amount of passive rewards, you&apos;ll need 24 &quot;
              <span className="gal">Mooning Monkeys</span>&quot;
            </h5>
            <h5 className="Evolution_text" style={{ marginTop: '1.25rem' }}>
              Bellow,you can see <span className="gal">The Evolution</span>, a visual that shows you{' '}
              <span className="gal">EXACTLY</span> how evolution process works:
            </h5>

            <h2 className="quetion_mark_heading eval-gradient-text">
              {evolutionTreeSteps[0].title}
            </h2>
            <MonkeysTreeGrid images={evolutionTreeSteps[0].images} />
            <GalacticGorillasPhase title={evolutionTreeSteps[1].title} />
            <AlienYetiPhase
              alienTitle={evolutionTreeSteps[2].title}
              yetiTitle={evolutionTreeSteps[3].title}
            />
          </div>

          {/* Evolution earning */}
          <div className="pd__reward">
            <h2 className="eval-earn-title eval-gradient-text">{evolutionEarning.title}</h2>
            <p className="table_text">{evolutionEarning.text}</p>
            <p className="table_text" style={{ marginBottom: '2.5rem' }}>
              {evolutionEarning.text2}
            </p>

            <div className="result-table-sec">
              <table className="result-table">
                <thead>
                  <tr>
                    <th>STAGE</th>
                    <th>UNIT</th>
                    <th className="remarks-width">REMARKS</th>
                    <th>REWARDS*</th>
                    <th>BONUS*</th>
                  </tr>
                </thead>
                <tbody>
                  {evolutionRewardsTable.map((row, i) => (
                    <tr key={row.stage}>
                      <td>{row.stage}</td>
                      <td>{row.unit}</td>
                      <td>{row.remarks}</td>
                      {i === 0 && (
                        <td rowSpan={4} className="rewards-cell">
                          25%
                        </td>
                      )}
                      <td>{row.bonus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="btn_box">
            <Link to="/#calculator" className="eval-calc-btn">
              check out profit calculator
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
