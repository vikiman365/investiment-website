export interface PlanCardProps {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[] | unknown; // Updated to handle translation objects
  cta: string;
  popular: boolean;
  badge?: string;
}

export interface PortfolioData {
  month: string;
  value: number;
}

export interface PerformanceData {
  name: string;
  return: number;
}

export interface DistributionData {
  name: string;
  value: number;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  description: string;
  minInvestment: number;
  expectedReturn: number;
  riskLevel: 'low' | 'medium' | 'high';
  duration: number;
  features: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  portfolioValue: number;
  totalReturns: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'investment';
  amount: number;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
}

export interface DashboardStats {
  totalPortfolioValue: number;
  monthlyReturn: number;
  activeInvestments: number;
  totalReturns: number;
}