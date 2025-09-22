import React from 'react';
import Header from '@/components/Header';
import ContactSection from '@/components/ContactSection';

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <ContactSection />
      </main>
    </div>
  );
};

export default Contact;