// app/dashboard/page.js
import Dashboard from "@/components/dashboard";

// Fetch data on the server side
const fetchData = async () => {
  const res = await fetch('http://localhost:3000/api/evData', {
    cache: 'no-store', // Disable caching for fresh data on every request
  });
  const evData = await res.json();
  return evData;
};

export default async function DashboardPage() {
  const evData = await fetchData(); // Fetch data directly in the component

  return (
    <Dashboard evData={evData} />
  );
}
