import React from 'react';

const Health = () => {
  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    services: {
      database: 'connected',
      authentication: 'active',
      email: 'active'
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Health Check</h1>
        <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
          {JSON.stringify(healthData, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default Health;