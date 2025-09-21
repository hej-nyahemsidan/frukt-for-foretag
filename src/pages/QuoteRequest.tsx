import React from 'react';
import Header from '@/components/Header';
import QuoteRequestSection from '@/components/QuoteRequestSection';
import Footer from '@/components/Footer';

const QuoteRequest = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <QuoteRequestSection />
      </main>
      <Footer />
    </div>
  );
};

export default QuoteRequest;