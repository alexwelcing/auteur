import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import '../styles/globals.css';


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

const HomePage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [filter, setFilter] = useState('');  // New filter state

  useEffect(() => {
    const fetchData = async () => {
      let query = supabase.from('companies').select('*');
      if (filter) {
        query = query.ilike('company_name', `%${filter}%`);
      }
      const { data, error } = await query;
      if (error) {
        console.error('Error fetching companies:', error);
      } else if (data) {
        setCompanies(data);
      }
    };
    fetchData();
  }, [filter]);

  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2">
      <h1 className="text-6xl font-extrabold mb-4 shadow-text">Auteur</h1>
      <h2 className="text-2xl opacity-90 mb-8 shadow-text">Dev Phase</h2>
      <input className="text-center text-purple-100 bg-zinc-700 rounded-md"
        type="text"
        placeholder="Search companies"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      {companies.length ? (
        <div className="w-full max-w-2xl p-8 m-4 rounded-lg shadow-lg bg-blue-800 bg-blend-multiply hover:mix-blend-overlay bg-opacity-60">
          <ul className="space-y-4">
            {companies.map((company) => (
              <li key={company.id} className="flex items-center space-x-4">
                <span className="text-xl font-semibold text-blue-200 w-8">{company.id}</span>
                <Link className="text-xl text-blue-200 hover:underline hover:text-blue-100 flex-1" href={`/${company.id}`}>
                  {company.company_name}
                </Link>
              </li>

            ))}
          </ul>
        </div>
      ) : (
        <p className="text-2xl text-white opacity-80 shadow-text">Loading companies...</p>
      )}
    </div>
  );
};

export default HomePage;
