import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { LoanApplication } from '../types';
import { EligibilityResult } from '../types';
import { FormInput } from './FormInput';
import { ResultDisplay } from './ResultDisplay';
import { useLoanEligibility } from '../hooks/useLoanEligibility';

export default function LoanForm() {
  const [formData, setFormData] = useState<LoanApplication>({
    income: 0,
    loanAmount: 0,
    creditScore: 0,
    employmentYears: 0,
    dependents: 0
  });
  
  const { checkEligibility, result } = useLoanEligibility();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkEligibility(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: Number(e.target.value)
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Loan Eligibility Check</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Annual Income"
            name="income"
            value={formData.income}
            onChange={handleChange}
            min={0}
            required
          />
          
          <FormInput
            label="Loan Amount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            min={0}
            required
          />
          
          <FormInput
            label="Credit Score"
            name="creditScore"
            value={formData.creditScore}
            onChange={handleChange}
            min={300}
            max={850}
            required
          />
          
          <FormInput
            label="Years of Employment"
            name="employmentYears"
            value={formData.employmentYears}
            onChange={handleChange}
            min={0}
            required
          />
          
          <FormInput
            label="Number of Dependents"
            name="dependents"
            value={formData.dependents}
            onChange={handleChange}
            min={0}
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Check Eligibility
        </button>
      </form>

      {result && <ResultDisplay result={result} />}
    </div>
  );
}