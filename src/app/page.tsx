import { getHosts } from "@/api/hosts";
import { Host } from "@/components/Host";

export const revalidate = 60;

export default async function Home() {
  const hosts = await getHosts();

  return (
    <div className="h-lvh flex flex-col justify-center mx-auto items-center">
      <h1 className="text-4xl font-bold mb-8 text-violet-600">Services</h1>

      <ul className="text-violet-400 list-disc">
        {hosts.map((host) => (
          <Host host={host} key={host.name} />
        ))}
      </ul>
    </div>
  );
}
