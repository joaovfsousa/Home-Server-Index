import { getHosts } from "@/api/hosts";
import { Host } from "@/components/Host";

export const revalidate = 60;

export default async function Home() {
  const hosts = await getHosts();

  return (
    <div className="h-lvh bg-red-500 flex flex-col justify-center text-center">
      <h1 className="text-4xl font-bold mb-8">Services</h1>

      {hosts.map((host) => (
        <Host host={host} key={host.name} />
      ))}
    </div>
  );
}
