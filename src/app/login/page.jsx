import React from 'react';
import LoginForm from '@/components/custom/Auth/LoginForm';
import NavigationGuard from '@/components/custom/Auth/NavigationGuard';

const LoginPage = () => {
  return (
    <NavigationGuard requireAuth={false}>
      <LoginForm />
    </NavigationGuard>
  );
};

export default LoginPage; 