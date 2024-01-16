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
      <li className="mb-3">
        <h1 className="text-2xl">{host.name}</h1>
        <ul className="list-disc list-inside">
          {host.domainNames.map((domainName) => (
            <li key={domainName} className="mb-2">
              <a
                href={formatDomainName(domainName, host)}
                target="_self"
                className="inline-block mr-3"
              >
                <h1 className="text-l">{domainName}</h1>
              </a>
              <a
                href={formatDomainName(domainName, host)}
                target="_blank"
                className="inline-block"
              >
                <h1 className="text-l">🛫</h1>
              </a>
            </li>
          ))}
        </ul>
      </li>
    );
  }

  const [domainName] = host.domainNames;

  return (
    <li className="mb-3">
      <a
        href={formatDomainName(domainName, host)}
        target="_self"
        className="inline-block mr-3"
      >
        <h1 className="text-2xl">{host.name}</h1>
      </a>
      <a
        href={formatDomainName(domainName, host)}
        target="_blank"
        className="inline-block"
      >
        <h1 className="text-2xl">🛫</h1>
      </a>
    </li>
  );
};
