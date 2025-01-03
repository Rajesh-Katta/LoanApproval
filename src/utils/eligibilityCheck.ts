import { LoanApplication } from '../types';
import { ELIGIBILITY_CRITERIA, MODEL_WEIGHTS, NORMALIZATION_FACTORS } from './constants';

export function checkBasicEligibility(data: LoanApplication) {
  const issues: string[] = [];
  
  if (data.income < ELIGIBILITY_CRITERIA.MIN_INCOME) {
    issues.push(`Minimum annual income requirement not met (${ELIGIBILITY_CRITERIA.MIN_INCOME.toLocaleString()})`);
  }
  
  if (data.creditScore < ELIGIBILITY_CRITERIA.MIN_CREDIT_SCORE) {
    issues.push(`Credit score below minimum requirement (${ELIGIBILITY_CRITERIA.MIN_CREDIT_SCORE})`);
  }
  
  if (data.loanAmount / data.income > ELIGIBILITY_CRITERIA.MAX_DEBT_TO_INCOME) {
    issues.push(`Loan amount exceeds maximum debt-to-income ratio (${ELIGIBILITY_CRITERIA.MAX_DEBT_TO_INCOME}:1)`);
  }
  
  if (data.employmentYears < ELIGIBILITY_CRITERIA.MIN_EMPLOYMENT_YEARS) {
    issues.push(`Minimum employment history not met (${ELIGIBILITY_CRITERIA.MIN_EMPLOYMENT_YEARS} years)`);
  }
  
  return issues;
}

export function predictEligibility(data: LoanApplication): number {
  const normalized = {
    income: data.income / NORMALIZATION_FACTORS.income,
    loanAmount: data.loanAmount / NORMALIZATION_FACTORS.loanAmount,
    creditScore: data.creditScore / NORMALIZATION_FACTORS.creditScore,
    employmentYears: data.employmentYears / NORMALIZATION_FACTORS.employmentYears,
    dependents: data.dependents / NORMALIZATION_FACTORS.dependents
  };
  
  const score = Object.entries(MODEL_WEIGHTS).reduce((acc, [key, weight]) => {
    return acc + weight * normalized[key as keyof typeof normalized];
  }, 0);
    
  return 1 / (1 + Math.exp(-score));
}