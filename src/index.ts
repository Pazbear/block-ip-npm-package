import { NextFunction, Request, Response } from "express";
import is from "is_js";

interface Ipv4_Info {
  StartIP: string;
  EndIP: string;
}

const isIncludedIP = (
  startIP: string,
  endIP: string,
  clientIP: string
): boolean => {
  const start_ip = startIP.split(".");
  const end_ip = endIP.split(".");
  const client_ip = clientIP.split(".");
  for (let i = 0; i < 4; i++) {
    if (
      Number(start_ip[i]) > Number(client_ip[i]) ||
      Number(client_ip[i]) > Number(end_ip[i])
    ) {
      return false;
    }
  }
  return true;
};

export const block_ip = (country_code: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (
      is.not.existy(country_code) ||
      is.not.string(country_code) ||
      is.not.upperCase(country_code) ||
      is.falsy(country_code.length === 2)
    ) {
      throw new TypeError(`'${country_code}' is not 2-digit Country Code`);
    }
    const clientIP =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    if (is.not.ip(clientIP)) {
      throw new ReferenceError(`'${clientIP}' is not IP`);
    }
    const ipv4_infos: Ipv4_Info[] =
      require(`./ipv4/${country_code}.js`).default;
    for (const ipv4_info of ipv4_infos) {
      if (
        isIncludedIP(ipv4_info.StartIP, ipv4_info.EndIP, clientIP as string)
      ) {
        next();
        return;
      }
    }
    throw new Error(`Unpermitted IP`);
  };
};
