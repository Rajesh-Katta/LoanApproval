export const ELIGIBILITY_CRITERIA = {
  MIN_INCOME: 30000,
  MIN_CREDIT_SCORE: 650,
  MAX_DEBT_TO_INCOME: 3,
  MIN_EMPLOYMENT_YEARS: 2
} as const;

export const MODEL_WEIGHTS = {
  income: 0.4,
  loanAmount: -0.3,
  creditScore: 0.3,
  employmentYears: 0.2,
  dependents: -0.1
} as const;

export const NORMALIZATION_FACTORS = {
  income: 100000,
  loanAmount: 100000,
  creditScore: 850,
  employmentYears: 10,
  dependents: 5
} as const;