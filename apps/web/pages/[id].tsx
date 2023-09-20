import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { CompanyCard, CompanyName } from '../styles/styles'; // Importing styled components
import '../styles/globals.css';
import Link from 'next/link';


interface Company {
  id: number;
  company_name: string;
  url: string;
  status: string;
  notes: string;
  company_type: string;
  careers: string;
  size: string;
  roles: string;
  user_rank: number;
  career_page_url: string;
}

const CompanyDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [company, setCompany] = useState<Company | null>(null);

  useEffect(() => {
    if (id) {
      fetchCompany(id as string);
    }
  }, [id]);

  const fetchCompany = async (id: string) => {
    const { data, error } = await supabase
      .from('companies')
      .select('*')
      .eq('id', id)
      .single();
    if (error) console.error('Error fetching company:', error);
    if (data) setCompany(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      {company ? (
        <CompanyCard>
          <CompanyName>{company.company_name || 'N/A'}</CompanyName>
          <p className="text-gray-500">ID: {company.id || 'N/A'}</p>
          <p className="text-gray-500">URL: {company.url || 'N/A'}</p>
          <p className="text-gray-500">Status: {company.status || 'N/A'}</p>
          <p className="text-gray-500">Notes: {company.notes || 'N/A'}</p>
          <p className="text-gray-500">Company Type: {company.company_type || 'N/A'}</p>
          <Link className="text-gray-500" href={company.career_page_url}>Career Page Link</Link>
          <p className="text-gray-500">Size: {company.size || 'N/A'}</p>
          <p className="text-gray-500">Roles: {company.roles || 'N/A'}</p>
          <p className="text-gray-500">User Rank: {company.user_rank !== null ? company.user_rank : 'N/A'}</p>
        </CompanyCard>
      ) : (
        <p className="text-lg text-gray-500">Loading...</p>
      )}
    </div>
  );
};

export default CompanyDetail;
