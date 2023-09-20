import React from 'react';
import Company from './Company';

interface CompanyData {
  id: number;
  name: string;
  url: string;
  status: string;
  // Add more fields as needed
}

interface CompanyListProps {
  companies: CompanyData[];
}

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {
  return (
    <div>
      {companies.map((company) => (
        <Company key={company.id} {...company} />
      ))}
    </div>
  );
};

export default CompanyList;
