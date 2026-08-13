export const en = {
  common: {
    appName: 'ELEKTECH MT POS',
    search: 'Search...',
    save: 'Save',
    cancel: 'Cancel',
    loading: 'Loading...',
    noResults: 'No results found',
    viewAll: 'View all',
  },
  auth: {
    login: 'Sign In',
    logout: 'Sign Out',
    username: 'Username',
    password: 'Password',
    rememberMe: 'Remember me',
    loginTitle: 'Welcome Back',
    loginSubtitle: 'Sign in to your POS account',
    invalidCredentials: 'Invalid username or password',
    loginSuccess: 'Login successful',
  },
  nav: {
    dashboard: 'Dashboard',
    pos: 'Point of Sale',
    products: 'Products',
    inventory: 'Inventory',
    customers: 'Customers',
    reports: 'Reports',
    settings: 'Settings',
    users: 'Users',
  },
  dashboard: {
    title: 'Dashboard',
    todaySales: "Today's Sales",
    todayProfit: "Today's Profit",
    inventoryValue: 'Inventory Value',
    customerCredit: 'Customer Credit',
    cashDrawer: 'Cash Drawer',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    topProducts: 'Top Products',
    newSale: 'New Sale',
    addProduct: 'Add Product',
    receiveStock: 'Receive Stock',
    viewReports: 'View Reports',
    vsYesterday: 'vs yesterday',
    unitsSold: 'units sold',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
    toggle: 'Toggle theme',
  },
  language: {
    en: 'English',
    ar: 'Arabic',
    switch: 'Switch language',
  },
  notifications: {
    title: 'Notifications',
    empty: 'No new notifications',
    markAllRead: 'Mark all as read',
  },
} as const;

type TranslationShape<T> = {
  [K in keyof T]: T[K] extends string
    ? string
    : T[K] extends object
      ? TranslationShape<T[K]>
      : T[K];
};

export type TranslationKeys = TranslationShape<typeof en>;
