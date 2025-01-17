import { totp } from "otplib";
import config from "../config/config";

totp.options = { digits: 6, step: 300 };

export function generateOtp(email: string) {
  const token = totp.generate(`${config.secret}-${email}`);
  return token;
}
export function verifyOtp(email: string, userInput: string) {
  const verified = totp.check(userInput, `${config.secret}-${email}`);
  return verified;
}

export function generateRandomCode(code: string) {
  totp.options = { digits: 6 };
  const productCode = totp.generate(code);
  return productCode;
}
