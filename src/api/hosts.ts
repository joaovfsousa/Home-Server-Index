import { cache } from "react";
import { apiClient } from "./client";

const NAME_LINE_PREFIX = "#name=";

type NumeralBoolean = 0 | 1;

export type Host = {
  domainNames: string[];
  enabled: boolean;
  name: string;
  httpsAvailable: boolean;
};

type HostResponse = {
  domain_names: string[];
  enabled: NumeralBoolean;
  advanced_config: string;
  ssl_forced: NumeralBoolean;
};

export const getHosts: () => Promise<Host[]> = cache(async () => {
  const { data: proxyHosts } =
    await apiClient.get<HostResponse[]>("nginx/proxy-hosts");

  const hosts: Host[] = proxyHosts.map((host) => {
    let name = "No Name";

    const advancedConfigLines = host.advanced_config.split("\n");

    const nameLine = advancedConfigLines.find((line) =>
      line.startsWith(NAME_LINE_PREFIX),
    );

    if (nameLine) {
      name = nameLine.slice(NAME_LINE_PREFIX.length);
    }

    return {
      domainNames: host.domain_names,
      enabled: host.enabled === 1,
      name,
      httpsAvailable: host.ssl_forced === 1,
    };
  });

  return hosts;
});
