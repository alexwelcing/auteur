import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient'; // Import your Supabase client

interface Company {
  id: string;
  company_name: string;
  career_page_url: string;
  // ... add other fields
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
    <div>
      {company ? (
        <>
          <h1>{company.company_name}</h1>
          <p>ID: {company.id}</p>
          <p>Career Page URL: {company.career_page_url}</p>
          {/* ... render other fields */}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};
export default CompanyDetail;
