"use client"

import { useState } from 'react';

interface WhoisData {
  domain_name: string;
  registrar: string;
  registrar_url: string | string[];  // Can be a string or an array of strings
  whois_server: string;
  updated_date: number;
  creation_date: number;
  expiration_date: number;
  name_servers: string[];  // This should always be an array
  emails: string | string[];  // Can be a string or an array of strings
  dnssec: string;
  name: string;
  org: string;
  address: string;
  city: string;
  state: string;
  registrant_postal_code: string;
  country: string;
  error: any;
}

export default function WhoisPage() {
  const [url, setUrl] = useState('');
  const [whoisData, setWhoisData] = useState<WhoisData | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setWhoisData(null);

    const response = await fetch(`/api/whois?domain=${url}`);

    if (response.status === 200) {
      const data = await response.json();
      setWhoisData(data);

    }

    setLoading(false);
    console.log("loading off!")
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">WHOIS Lookup</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"
          className="bg-gray-800 text-white border border-gray-600 p-2 mr-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Lookup
        </button>
      </form>


      {loading && <p>Loading...</p>}

      {(whoisData && Object.keys(whoisData).length !== 0) ? (
        <div className="bg-gray-800 p-4 rounded shadow">
          <h2 className="text-xl font-bold mb-2">{whoisData.domain_name}</h2>
          <p><strong>Registrar:</strong> {whoisData.registrar}</p>
          <p>
            <strong>Registrar URL:</strong> {Array.isArray(whoisData.registrar_url) ? whoisData.registrar_url.join(', ') : whoisData.registrar_url}
          </p>
          <p><strong>WHOIS Server:</strong> {whoisData.whois_server}</p>
          <p><strong>Updated Date:</strong> {new Date(whoisData.updated_date * 1000).toLocaleDateString()}</p>
          <p><strong>Creation Date:</strong> {new Date(whoisData.creation_date * 1000).toLocaleDateString()}</p>
          <p><strong>Expiration Date:</strong> {new Date(whoisData.expiration_date * 1000).toLocaleDateString()}</p>
          <p><strong>Name Servers:</strong> {whoisData.name_servers.join(', ')}</p>
          <p>
            <strong>Emails:</strong> {Array.isArray(whoisData.emails) ? whoisData.emails.join(', ') : whoisData.emails}
          </p>
          <p><strong>DNSSEC:</strong> {whoisData.dnssec}</p>
          <p><strong>Name:</strong> {whoisData.name}</p>
          <p><strong>Organization:</strong> {whoisData.org}</p>
          <p><strong>Address:</strong> {whoisData.address}</p>
          <p><strong>City:</strong> {whoisData.city}</p>
          <p><strong>State:</strong> {whoisData.state}</p>
          <p><strong>Postal Code:</strong> {whoisData.registrant_postal_code}</p>
          <p><strong>Country:</strong> {whoisData.country}</p>
        </div>
      ): (whoisData === null || Object.keys(whoisData).length === 0) && (
        <p>No Info</p>
      )}
    </div>
  );
}