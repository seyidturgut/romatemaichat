import React from 'react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <img 
            src="https://romatem.com/wp-content/uploads/2024/09/logo.svg" 
            alt="Romatem Logo" 
            className="h-8"
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-800">AI Asistanı</h1>
            <p className="text-sm text-gray-600">
              Size nasıl yardımcı olabilirim?
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}