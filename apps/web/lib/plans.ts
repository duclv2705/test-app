export interface Plan {
  name: "Bronze" | "Silver" | "Gold";
  monthly_premium: number;
  annual_limit: number;
  benefits: {
    outpatient: { limit_per_visit: number; visits_per_year: number } | null;
    inpatient: { limit_per_day: number; days_per_year: number } | null;
    dental: { limit_per_year: number } | null;
    maternity: { limit_per_pregnancy: number } | null;
  };
  copay_percentage: number;
  waiting_period_days: number;
  highlights: string[];
}

const API_URL = process.env.API_URL ?? "http://localhost:4000/api";
export async function getPlans(): Promise<Plan[]> {
  const response = await fetch(`${API_URL}/plans`, { cache: "no-store" });
  if (!response.ok)
    throw new Error(`Unable to load plans (HTTP ${response.status})`);
  return response.json() as Promise<Plan[]>;
}
