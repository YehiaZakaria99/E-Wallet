export type decodedTokenType = {
  email: string;
  exp: number;
  iat: number;
  kycStatus: "approved" | "notApproved";
  sub: string;
};
