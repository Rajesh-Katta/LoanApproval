export interface LoanApplication {
  income: number;
  loanAmount: number;
  creditScore: number;
  employmentYears: number;
  dependents: number;
}

export interface EligibilityResult {
  eligible: boolean;
  issues: string[];
  score?: number;
}

export interface EligibilityCheck {
  result: EligibilityResult | null;
  checkEligibility: (data: LoanApplication) => void;
}