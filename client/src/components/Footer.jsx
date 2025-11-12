import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-indigo-600 text-white text-center py-3 mt-10 shadow-inner">
      <p className="text-sm">
        © {new Date().getFullYear()} Peer Project Hub — Built by{' '}
        <span className="font-semibold">Dhanushkumar Sekar</span>
      </p>
    </footer>
  );
}
