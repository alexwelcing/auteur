// Editor.tsx

'use client'

import { useState, useEffect } from "react";
import { supabase } from '../lib/supabaseClient';

export default function Editor({ companyId }) {
  const [saveStatus, setSaveStatus] = useState("Saved");
  const [companyInfo, setCompanyInfo] = useState({
    notes: "",
    company_name: "",
    company_type: "",
    career_page_url: "",
    // Add other fields here
  });
  const [companyTypes, setCompanyTypes] = useState<string[]>([]);

  useEffect(() => {
    const fetchCompanyInfo = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', companyId)
        .single();

      if (error) {
        console.error('Error fetching company info:', error);
        return;
      }

      if (data) {
        setCompanyInfo(data);
      }
    };

    const fetchCompanyTypes = async () => {
      const { data, error } = await supabase
      .from('distinct_company_types')
      .select('company_type');

      if (error) {
        console.error('Error fetching company types:', error);
        return;
      }

      if (data) {
        setCompanyTypes(data.map(item => item.company_type));
      }
    };

    fetchCompanyInfo();
    fetchCompanyTypes();
  }, [companyId]);

  const handleSave = async () => {
    setSaveStatus("Saving...");
    const { error } = await supabase
      .from('companies')
      .update(companyInfo)
      .eq('id', companyId);

    if (error) {
      console.error('Error saving:', error);
      setSaveStatus("Failed to Save");
      return;
    }

    setSaveStatus("Saved");
  };

  return (
    <div className="relative w-full max-w-screen-lg p-8 rounded-lg shadow-lg bg-white">
      <div className="mb-5 flex justify-end items-center bg-gray-100 p-2 rounded-lg text-gray-700">
        {saveStatus}
      </div>

      {/* Editor UI */}

      {/* Editable Fields */}
      <div className="mt-5">
        <input
          className="mb-3 p-2 w-full rounded border"
          type="text"
          placeholder="Company Name"
          value={companyInfo.company_name}
          onChange={(e) => setCompanyInfo({ ...companyInfo, company_name: e.target.value })}
        />

        <select
          className="mb-3 p-2 w-full rounded border"
          value={companyInfo.company_type}
          onChange={(e) => setCompanyInfo({ ...companyInfo, company_type: e.target.value })}
        >
          {companyTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

        <input
          className="mb-3 p-2 w-full rounded border"
          type="text"
          placeholder="Career Page URL"
          value={companyInfo.career_page_url}
          onChange={(e) => setCompanyInfo({ ...companyInfo, career_page_url: e.target.value })}
        />

        {/* Add other fields here */}
      </div>

      <button
        className="mt-5 p-3 bg-blue-500 text-white rounded"
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
