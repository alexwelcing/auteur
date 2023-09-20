import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient'; // Import your Supabase client

interface Company {
  id: string;
  company_name: string;
  career_page_url: string;
  // ... add other fields
}

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const { data, error } = await supabase
      .from('companies')
      .select('*');
    if (error) console.error('Error fetching companies:', error);
    if (data) setCompanies(data);
  };

  return (
    <div>
      <h1>Company List</h1>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <Link href={`/${company.id}`}>
              <a>{company.company_name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
