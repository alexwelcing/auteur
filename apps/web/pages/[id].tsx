// [id].tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import { CompanyCard, CompanyName } from '../styles/styles';
import '../styles/globals.css';
import Link from 'next/link';
import Editor from '../ui/editor';
import axios from 'axios';

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
      fetchRolesWithChatGPT(id as string);
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

  const fetchRolesWithChatGPT = async (companyId: string) => {
    const apiEndpoint = 'https://api.openai.com/v1/engines/davinci-codex/completions';
    const apiKey = 'your-api-key-here';

    const prompt = `Generate roles for company with ID ${companyId}`;
    const maxTokens = 50;

    try {
      const response = await axios.post(apiEndpoint, {
        prompt,
        max_tokens: maxTokens,
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        }
      });

      const generatedRoles = response.data.choices[0].text;
      // Process the generatedRoles and populate your roles table in Supabase
    }