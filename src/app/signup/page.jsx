import React from 'react';
import SignupForm from '@/components/custom/Auth/SignupForm';
import NavigationGuard from '@/components/custom/Auth/NavigationGuard';

const SignupPage = () => {
  return (
    <NavigationGuard requireAuth={false}>
      <SignupForm />
    </NavigationGuard>
  );
};

export default SignupPage; 