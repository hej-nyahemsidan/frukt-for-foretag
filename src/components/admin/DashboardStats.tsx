import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, UserCheck, Clock, TrendingUp } from 'lucide-react';

interface DashboardStatsProps {
  totalCustomers: number;
  activeCustomers: number;
  pendingRequests: number;
  loading: boolean;
}

const DashboardStats: React.FC<DashboardStatsProps> = ({
  totalCustomers,
  activeCustomers,
  pendingRequests,
  loading
}) => {
  const stats = [
    {
      title: 'Totalt antal kunder',
      value: totalCustomers,
      icon: Users,
      color: 'text-primary'
    },
    {
      title: 'Aktiva kunder',
      value: activeCustomers,
      icon: UserCheck,
      color: 'text-[hsl(122_39%_49%)]'
    },
    {
      title: 'Väntande förfrågningar',
      value: pendingRequests,
      icon: Clock,
      color: 'text-[hsl(34_100%_50%)]'
    },
    {
      title: 'Konverteringsgrad',
      value: totalCustomers > 0 ? `${Math.round((activeCustomers / totalCustomers) * 100)}%` : '0%',
      icon: TrendingUp,
      color: 'text-[hsl(207_79%_42%)]'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="admin-card">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-[hsl(220_13%_18%)] rounded mb-2"></div>
                <div className="h-8 bg-[hsl(220_13%_18%)] rounded mb-2"></div>
                <div className="h-4 w-16 bg-[hsl(220_13%_18%)] rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="admin-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[hsl(0_0%_65%)] mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold text-[hsl(0_0%_95%)]">
                    {stat.value}
                  </h3>
                </div>
                <Icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;