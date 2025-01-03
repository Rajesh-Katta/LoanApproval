import { useState } from 'react';
import { LoanApplication, EligibilityResult } from '../types';
import { checkBasicEligibility, predictEligibility } from '../utils/eligibilityCheck';

export function useLoanEligibility() {
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const checkEligibility = (data: LoanApplication) => {
    const issues = checkBasicEligibility(data);
    
    if (issues.length === 0) {
      const score = predictEligibility(data);
      setResult({
        eligible: score > 0.5,
        issues: [],
        score
      });
    } else {
      setResult({
        eligible: false,
        issues
      });
    }
  };

  return { result, checkEligibility };
}