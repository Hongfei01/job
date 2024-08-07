import bcrypt from 'bcryptjs';

export const createdHashedPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

export const isPasswordCorrect = async (password, hashedPassword) => {
  const isCorrect = await bcrypt.compare(password, hashedPassword);
  return isCorrect;
};
