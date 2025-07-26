import { Buffer } from 'buffer';

export const decodeJWT = (token) => {
  if (!token) return null;
  try {
    const [, payloadBase64] = token.split('.');
    const decodedPayload = JSON.parse(
      Buffer.from(payloadBase64, 'base64').toString('utf-8')
    );
    return decodedPayload;
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
};