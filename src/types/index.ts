export interface DecodedPayload {
  [key: string]: never;
}

export type HexDecimal = {
    hex: string;
    decimal: number;
    binary: string;
    ascii: string;
}
