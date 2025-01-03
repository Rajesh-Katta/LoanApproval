import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { EligibilityResult } from '../types';

interface ResultDisplayProps {
  result: EligibilityResult;
}

export function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className={`mt-6 p-4 rounded-lg ${result.eligible ? 'bg-green-50' : 'bg-red-50'}`}>
      <div className="flex items-center">
        {result.eligible ? (
          <CheckCircle2 className="h-6 w-6 text-green-600 mr-2" />
        ) : (
          <AlertCircle className="h-6 w-6 text-red-600 mr-2" />
        )}
        <h2 className={`text-lg font-semibold ${result.eligible ? 'text-green-800' : 'text-red-800'}`}>
          {result.eligible ? 'Eligible for Loan' : 'Not Eligible for Loan'}
        </h2>
      </div>
      
      {result.score && (
        <p className="mt-2 text-gray-600">
          Approval Score: {(result.score * 100).toFixed(1)}%
        </p>
      )}
      
      {result.issues.length > 0 && (
        <div className="mt-2">
          <p className="font-medium text-red-800">Issues found:</p>
          <ul className="list-disc list-inside text-red-700">
            {result.issues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}