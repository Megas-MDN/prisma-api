import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET || 'secret';

const genToken = ({
  expires = '8h',
  payload,
}: {
  expires?: string;
  payload: object;
}) => {
  const jwtConfig = {
    expiresIn: expires,
  };
  return jwt.sign(payload, secret, jwtConfig);
};

const validateToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, secret);
    return decoded;
  } catch (error) {
    return { status: 401, message: 'Expired or invalid token' };
  }
};

export { genToken, validateToken };
