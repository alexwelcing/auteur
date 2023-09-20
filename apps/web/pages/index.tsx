import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '../lib/supabaseClient';
import '../styles/globals.css';


interface Company {
  id: string;
  company_name: string;
  // ... other fields
}

const HomePage: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('companies').select('*');
      if (error) {
        console.error('Error fetching companies:', error);
      } else if (data) {
        setCompanies(data);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 py-2">
      <h1 className="text-6xl font-extrabold text-white mb-4">Auteur</h1>
      <h2 className="text-2xl text-white opacity-70 mb-8">Experimental Phase</h2>

      {companies.length ? (
        <div className="w-full max-w-2xl p-8 rounded-lg shadow-lg bg-white opacity-90">
          <h3 className="text-3xl font-semibold mb-4">Companies:</h3>
          <ul className="space-y-4">
            {companies.map((company) => (
              <li key={company.id} className="flex items-center space-x-4">
                <span className="text-xl font-semibold text-purple-500">{company.id}</span>
                <Link className="text-2xl text-blue-600 hover:underline hover:text-blue-800" href={`/${company.id}`}>
                    {company.company_name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p className="text-2xl text-white opacity-80">Loading companies...</p>
      )}
    </div>
  );
};

export default HomePage;
