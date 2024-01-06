export const createTokenUser = (user) => {
  return {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    otp: user.otp,
    isVerified: user.isVerified,
  };
};
