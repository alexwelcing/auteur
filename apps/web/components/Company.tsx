import React from 'react';

interface CompanyProps {
  id: number;
  name: string;
  url: string;
  status: string;
  // Add more fields as needed
}

const Company: React.FC<CompanyProps> = ({ id, name, url, status }) => {
  return (
    <div>
      <h2>{name}</h2>
      <p>ID: {id}</p>
      <a href={url}>Website</a>
      <p>Status: {status}</p>
    </div>
  );
};

export default Company;
