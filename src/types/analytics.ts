export interface Analytics {
  stats: {
    revenue: number;

    totalOrders: number;

    completedOrders: number;

    pendingOrders: number;

    totalGames: number;

    totalCustomers: number;
  };

  paymentMethods: {
    ABA: number;

    ACLEDA: number;

    Wing: number;

    TrueMoney: number;
  };

  topGames: {
    name: string;

    orders: number;
  }[];

  monthlyRevenue: {
    month: string;

    revenue: number;
  }[];

  monthlyOrders: {
    month: string;

    orders: number;
  }[];
}