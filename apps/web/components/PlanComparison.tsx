import type { Plan } from "@/lib/plans";

const money = (value: number) =>
  new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
const unlimited = (value: number) =>
  value === -1 ? "Unlimited" : String(value);

function bestValue(
  plans: Plan[],
  selector: (plan: Plan) => number,
  mode: "max" | "min",
) {
  const values = plans.map(selector).filter(Number.isFinite);
  const target = mode === "max" ? Math.max(...values) : Math.min(...values);
  return plans
    .filter((plan) => selector(plan) === target)
    .map((plan) => plan.name);
}

export function PlanComparison({ plans }: { plans: Plan[] }) {
  const bestAnnual = bestValue(plans, (p) => p.annual_limit, "max");
  const bestCopay = bestValue(plans, (p) => p.copay_percentage, "min");
  const bestWait = bestValue(plans, (p) => p.waiting_period_days, "min");
  const bestOutpatient = bestValue(
    plans,
    (p) => p.benefits.outpatient?.limit_per_visit ?? 0,
    "max",
  );
  const bestInpatient = bestValue(
    plans,
    (p) => p.benefits.inpatient?.limit_per_day ?? 0,
    "max",
  );
  const recommended = "Silver";
  const valueRows = [
    {
      label: "Annual coverage limit",
      values: plans.map((p) => money(p.annual_limit)),
      best: bestAnnual,
      note: "Maximum payable per policy year",
    },
    {
      label: "Outpatient · per visit",
      values: plans.map((p) =>
        p.benefits.outpatient
          ? money(p.benefits.outpatient.limit_per_visit)
          : null,
      ),
      best: bestOutpatient,
      note: "Doctor visits and outpatient care",
    },
    {
      label: "Outpatient · visits/year",
      values: plans.map((p) =>
        p.benefits.outpatient
          ? unlimited(p.benefits.outpatient.visits_per_year)
          : null,
      ),
      best: plans
        .filter((p) => p.benefits.outpatient?.visits_per_year === -1)
        .map((p) => p.name),
      note: "Number of covered visits",
    },
    {
      label: "Inpatient · per day",
      values: plans.map((p) =>
        p.benefits.inpatient ? money(p.benefits.inpatient.limit_per_day) : null,
      ),
      best: bestInpatient,
      note: "Hospital room and eligible daily care",
    },
    {
      label: "Inpatient · days/year",
      values: plans.map((p) =>
        p.benefits.inpatient
          ? unlimited(p.benefits.inpatient.days_per_year)
          : null,
      ),
      best: plans
        .filter((p) => p.benefits.inpatient?.days_per_year === -1)
        .map((p) => p.name),
      note: "Covered hospital days",
    },
    {
      label: "Dental · annual limit",
      values: plans.map((p) =>
        p.benefits.dental ? money(p.benefits.dental.limit_per_year) : null,
      ),
      best: bestValue(
        plans,
        (p) => p.benefits.dental?.limit_per_year ?? 0,
        "max",
      ),
      note: "Eligible dental treatment",
    },
    {
      label: "Maternity · per pregnancy",
      values: plans.map((p) =>
        p.benefits.maternity
          ? money(p.benefits.maternity.limit_per_pregnancy)
          : null,
      ),
      best: bestValue(
        plans,
        (p) => p.benefits.maternity?.limit_per_pregnancy ?? 0,
        "max",
      ),
      note: "Eligible maternity expenses",
    },
    {
      label: "Your co-pay",
      values: plans.map((p) => `${p.copay_percentage}%`),
      best: bestCopay,
      note: "Your share of eligible costs",
    },
    {
      label: "Waiting period",
      values: plans.map((p) => `${p.waiting_period_days} days`),
      best: bestWait,
      note: "Before coverage becomes active",
    },
  ];

  return (
    <>
      <div className="plan-cards">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={`plan-card ${plan.name.toLowerCase()} ${plan.name === recommended ? "recommended" : ""}`}
          >
            {plan.name === recommended && (
              <div className="recommended-ribbon">✦ Recommended</div>
            )}
            <div className="plan-topline">
              <span className={`plan-dot ${plan.name.toLowerCase()}`} />{" "}
              <span className="plan-name">{plan.name}</span>
              <span className="plan-tier">
                {plan.name === "Bronze"
                  ? "ESSENTIAL"
                  : plan.name === "Silver"
                    ? "BALANCED"
                    : "PREMIUM"}
              </span>
            </div>
            <div className="price">
              <span className="currency">฿</span>
              {money(plan.monthly_premium)}
              <span className="per-month">/ month</span>
            </div>
            <p className="plan-summary">
              {plan.name === "Bronze"
                ? "The essentials, without the extras."
                : plan.name === "Silver"
                  ? "More room to breathe, more peace of mind."
                  : "Comprehensive cover for bigger confidence."}
            </p>
            <div className="card-divider" />
            <div className="highlights-label">WHAT YOU'LL LOVE</div>
            <ul className="highlights">
              {plan.highlights.map((item) => (
                <li key={item}>
                  <span className="check">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <a
              className={`plan-button ${plan.name === recommended ? "filled" : ""}`}
              href={`mailto:hello@example.com?subject=${encodeURIComponent(`Enquiry about ${plan.name} plan`)}`}
            >
              Explore {plan.name} <span>↗</span>
            </a>
          </article>
        ))}
      </div>
      <div className="table-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th className="feature-heading">
                <span>PLAN BENEFITS</span>
                <small>Compare the details</small>
              </th>
              {plans.map((p) => (
                <th
                  key={p.name}
                  className={p.name === recommended ? "recommended-col" : ""}
                >
                  <span className={`table-plan-dot ${p.name.toLowerCase()}`} />
                  {p.name}
                  {p.name === recommended && (
                    <span className="mini-rec">BEST VALUE</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="group-row">
              <td colSpan={4}>COVERAGE & LIMITS</td>
            </tr>
            {valueRows.slice(0, 7).map((row) => (
              <tr key={row.label}>
                <td className="feature-cell">
                  <strong>{row.label}</strong>
                  <small>{row.note}</small>
                </td>
                {row.values.map((value, i) => (
                  <td
                    key={plans[i].name}
                    className={`${plans[i].name === recommended ? "recommended-col" : ""} ${row.best.includes(plans[i].name) ? "best-cell" : ""}`}
                  >
                    {value === null ? (
                      <span className="not-included">
                        <span>×</span> Not included
                      </span>
                    ) : (
                      <>
                        <span className="cell-value">{value}</span>
                        {row.best.includes(plans[i].name) && (
                          <span className="best-tag">BEST</span>
                        )}
                      </>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="group-row">
              <td colSpan={4}>COST & ACCESS</td>
            </tr>
            {valueRows.slice(7).map((row) => (
              <tr key={row.label}>
                <td className="feature-cell">
                  <strong>{row.label}</strong>
                  <small>{row.note}</small>
                </td>
                {row.values.map((value, i) => (
                  <td
                    key={plans[i].name}
                    className={`${plans[i].name === recommended ? "recommended-col" : ""} ${row.best.includes(plans[i].name) ? "best-cell" : ""}`}
                  >
                    <span className="cell-value">{value}</span>
                    {row.best.includes(plans[i].name) && (
                      <span className="best-tag">BEST</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="table-price-row">
              <td className="feature-cell">
                <strong>Monthly premium</strong>
                <small>Your monthly payment</small>
              </td>
              {plans.map((p) => (
                <td
                  key={p.name}
                  className={p.name === recommended ? "recommended-col" : ""}
                >
                  <strong className="table-price">
                    ฿{money(p.monthly_premium)}
                  </strong>
                  <small className="table-price-sub">per month</small>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div className="legend">
        <span>
          <span className="legend-best">✓</span> Best in category
        </span>
        <span>
          <span className="legend-none">×</span> Not included in plan
        </span>
        <span className="legend-note">
          * Unlimited means no annual visit/day count cap in the supplied plan
          data.
        </span>
      </div>
    </>
  );
}
