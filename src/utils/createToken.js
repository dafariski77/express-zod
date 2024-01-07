export const createTokenUser = (user) => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    otp: user.otp,
    isVerified: user.isVerified,
  };
};
