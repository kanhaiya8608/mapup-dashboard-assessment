import Dashboard from "@/components/dashboard";

const fetchData = async () => {
  const res = await fetch('http://localhost:3000/api/evData', {
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
