import * as locutusModule from 'locutus';
import { math } from 'locutus/php';
import { HexDecimal } from '../types';

export function hexToBinaryDecimal(data: string): [HexDecimal] {
  const hexData = data.match(new RegExp('.{1,2}', 'g')) || [];
  const hexDecimalBinary: Array<HexDecimal> = [];
  hexData.forEach((singleHexByte) => {
    const decimalVal = baseConvert(singleHexByte, 16, 2);
    const binaryValue = decimalVal.padStart(8, '0');
    const newHexDecimalBinary = {
      hex: singleHexByte,
      decimal: parseInt(baseConvert(singleHexByte, 16, 10)),
      binary: binaryValue,
      ascii: hexToStr(singleHexByte),
    };
    hexDecimalBinary.push(newHexDecimalBinary);
  });
  return hexDecimalBinary;
}

export function baseConvert(
  data: string | number,
  fromBase: number,
  toBase: number,
) {
  let num = data;
  if (isNaN(<number>data)) {
    num = parseInt(data as string, fromBase);
    fromBase = 10;
  }
  return parseInt(num + '', fromBase | 0).toString(toBase | 0);
}

export function hexToDecimalMessageDecoder(
  decimalData: number,
  bitsMessages: { [key: string]: string } | string[],
) {
  if (decimalData in bitsMessages) {
    return bitsMessages[decimalData];
  } else {
    return null;
  }
}

function hexToStr(str1: string) {
  const hex = str1.toString();
  let str = '';
  for (let n = 0; n < hex.length; n += 2) {
    str += String.fromCharCode(parseInt(hex.substring(n, 3), 16));
  }
  return str;
}

export function signedHexToDecimal(hexNumber: string, binaryDigits = 8) {
  //first convert into binary
  const binary = hexToBinary(hexNumber, binaryDigits);
  const newBinary = binary.split('');
  let decimal: number;
  if ('1' == binary[0]) {
    //Now convert binary into 1's complement
    //console.log(`binary length: ${binary.length}`);
    for (let i = 0; i < binary.length; i++) {
      if (1 == parseInt(binary[i])) {
        newBinary[i] = 0;
      } else {
        newBinary[i] = 1;
      }
    }

    //now add 1 to convert into 2's complement
    decimal = binaryToDecimal(newBinary.join(''));
    decimal++;
    decimal = -decimal;
  } else {
    decimal = binaryToDecimal(binary);
  }

  return Number(decimal);
}

function hexToBinary(hex: string, binaryDigits: number) {
  const HexNumber = locutusModule.php.math.base_convert(hex, 16, 2);
  return HexNumber.padStart(binaryDigits, '0');
}

export function binaryToDecimal(binary: string) {
  return locutusModule.php.math.base_convert(binary, 2, 10);
}

export function binaryToHex(binary: string) {
  return locutusModule.php.math.base_convert(binary, 2, 16);
}

export function hexToDecimal(hex: string) {
  return parseInt(math.base_convert(hex, 16, 10));
}

export function hexToBinaryMessageDecoder(
  hexData: string,
  bitsMessages: { [key: number]: string | undefined; nobit?: string },
  returnType: 'string' | 'array' = 'string',
): string | string[] {
  const decVal: string = math.base_convert(hexData, 16, 2);
  const binaryValue: string = decVal.padEnd(8, '0');
  let dataMessage: string = '';
  const diffMsgs: string[] = [];

  // We will traverse in reverse to check the bits set and set messages sent by the device
  const binaryValueArr: string[] = binaryValue.match(/.{1,1}/g) || [];

  for (let bitNo = 0; bitNo < binaryValueArr.length; bitNo++) {
    const value: number = parseInt(binaryValueArr[bitNo]);
    if (value === 1) {
      if (bitNo in bitsMessages) {
        diffMsgs[bitNo] = bitsMessages[bitNo] || '';
      }
    }
  }

  if ('nobit' in bitsMessages && diffMsgs.length === 0) {
    diffMsgs.push(bitsMessages['nobit'] || '');
  }

  if (returnType === 'array') {
    return diffMsgs;
  } else {
    if (diffMsgs.length) {
      dataMessage += diffMsgs.toString();
    }

    return dataMessage;
  }
}
