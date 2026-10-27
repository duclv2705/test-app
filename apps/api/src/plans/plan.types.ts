export interface OutpatientBenefit {
  limit_per_visit: number;
  visits_per_year: number;
}
export interface InpatientBenefit {
  limit_per_day: number;
  days_per_year: number;
}
export interface DentalBenefit {
  limit_per_year: number;
}
export interface MaternityBenefit {
  limit_per_pregnancy: number;
}
export interface InsurancePlan {
  name: "Bronze" | "Silver" | "Gold";
  monthly_premium: number;
  annual_limit: number;
  benefits: {
    outpatient: OutpatientBenefit | null;
    inpatient: InpatientBenefit | null;
    dental: DentalBenefit | null;
    maternity: MaternityBenefit | null;
  };
  copay_percentage: number;
  waiting_period_days: number;
  highlights: string[];
}
