import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import portalDashboardImg from '@/assets/customer-portal-dashboard.jpg';

const CustomerPortalSection = () => {
  return (
    <section className="py-20 px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        
        {/* Text Content */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 max-w-4xl mx-auto mb-6">
            Hantera dina fruktleveranser enkelt med vår smidiga kundportal
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Med vår kundportal kan du enkelt logga in och hantera din prenumeration och leveranser. 
            Du kan ändra, avboka och lägga till leveranser från fruktbud, på ett enkelt och smidigt sätt.
          </p>
        </div>

        {/* Moving Image */}
        <div className="relative overflow-hidden rounded-2xl shadow-lg mb-12 bg-white">
          <div className="portal-slide">
            <img
              src={portalDashboardImg}
              alt="Fruktexperten customer portal dashboard interface showing delivery management and scheduling features"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Call-to-Action */}
        <div className="text-center">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 text-lg rounded-lg inline-flex items-center gap-3">
            Kundportalen
            <ExternalLink className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CustomerPortalSection;