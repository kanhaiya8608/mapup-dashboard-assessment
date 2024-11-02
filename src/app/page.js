import Dashboard from "@/components/dashboard";

const fetchData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/evData`, {
    cache: 'no-store',
  });
  const evData = await res.json();
  return evData;
};

export default async function DashboardPage() {
  const evData = await fetchData(); 

  return (
    <Dashboard evData={evData} />
  );
}
