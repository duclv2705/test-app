import { getPlans } from "@/lib/plans";
import { PlanComparison } from "@/components/PlanComparison";

export default async function HomePage() {
  const plans = await getPlans();
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top">
          <span className="brand-mark">+</span> wellnest
        </a>
        <nav>
          <a href="#compare">Compare plans</a>
          <a href="#how-it-works">How it works</a>
        </nav>
        <a className="header-cta" href="#compare">
          Find your cover <span>↗</span>
        </a>
      </header>
      <section className="hero" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-dot" /> HEALTH COVER, MADE CLEAR
          </div>
          <h1>
            Cover that fits
            <br />
            your <em>kind of life.</em>
          </h1>
          <p>
            Good health cover shouldn't be hard to compare. See what's included,
            understand what you'll pay, and find the plan that feels right for
            you.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="#compare">
              Compare plans <span>↓</span>
            </a>
            <div className="trust-note">
              <span className="trust-icon">✓</span>
              <span>
                <strong>Clear. Simple. Side by side.</strong>
                <small>No confusing fine print here.</small>
              </span>
            </div>
          </div>
        </div>
        <div
          className="hero-art"
          aria-label="Abstract illustration of a shield and leaves"
        >
          <div className="sun-orb" />
          <div className="art-ring ring-one" />
          <div className="art-ring ring-two" />
          <div className="shield">
            <span>+</span>
          </div>
          <div className="leaf leaf-one" />
          <div className="leaf leaf-two" />
          <div className="art-caption">
            <span className="caption-check">✓</span>
            <span>
              <strong>Your health, your way</strong>
              <small>Coverage for life's moments</small>
            </span>
          </div>
        </div>
      </section>
      <section className="compare-section" id="compare">
        <div className="section-heading">
          <div>
            <div className="eyebrow">THE DETAILS, AT A GLANCE</div>
            <h2>
              Find your <em>fit.</em>
            </h2>
            <p>Three levels of cover. One clear comparison.</p>
          </div>
          <div className="currency-note">
            <span>◎</span> All prices shown in THB
          </div>
        </div>
        <PlanComparison plans={plans} />
      </section>
      <section className="bottom-note" id="how-it-works">
        <div className="bottom-icon">✳</div>
        <div>
          <h3>Good to know</h3>
          <p>
            Benefits and limits are shown for comparison. Actual coverage is
            subject to policy terms, exclusions and eligibility. A higher limit
            does not guarantee every expense will be covered.
          </p>
        </div>
        <a href="#compare">Back to plans ↑</a>
      </section>
      <footer>
        <a className="brand" href="#top">
          <span className="brand-mark">+</span> wellnest
        </a>
        <span>Health cover, made a little simpler.</span>
        <span>© 2026 Wellnest Insurance</span>
      </footer>
    </main>
  );
}
