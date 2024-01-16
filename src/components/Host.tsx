import { FC } from "react";
import { Host as HostType } from "@/api/hosts";

type HostProps = {
  host: HostType;
};

const formatDomainName = (domainName: string, host: HostType) => {
  const protocol = host.httpsAvailable ? "https" : "http";

  return `${protocol}://${domainName}`;
};

export const Host: FC<HostProps> = ({ host }) => {
  if (host.domainNames.length === 0) {
    return null;
  }

  const hasMultipleDomains = host.domainNames.length > 1;

  if (hasMultipleDomains) {
    return (
      <div className="flex flex-col items-center  mb-2">
        <h1 className="text-2xl">{host.name}</h1>
        <ul>
          {host.domainNames.map((domainName) => (
            <li key={domainName}>
              <div className="flex flex-row self-center space-x-2 mb-2">
                <a href={formatDomainName(domainName, host)}>
                  <h1 className="text-l">{domainName}</h1>
                </a>
                <a href={formatDomainName(domainName, host)} target="_blank">
                  <h1 className="text-l">🛫</h1>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const [domainName] = host.domainNames;

  return (
    <div className="flex flex-row self-center space-x-2 mb-2">
      <a href={formatDomainName(domainName, host)}>
        <h1 className="text-2xl">{host.name}</h1>
      </a>
      <a href={formatDomainName(domainName, host)} target="_blank">
        <h1 className="text-2xl">🛫</h1>
      </a>
    </div>
  );
};
