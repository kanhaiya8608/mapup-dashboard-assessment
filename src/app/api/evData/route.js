import csv from 'csv-parser';

export async function GET(req) {
  try {
    // Fetch the CSV file from the public folder
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/data-to-visualize/Electric_Vehicle_Population_Data.csv`);
    const csvText = await res.text();

    // Convert CSV text into JSON array
    const evData = [];
    const parseCSV = (csvText) => {
      return new Promise((resolve) => {
        const rows = csvText.split('\n');
        const headers = rows[0].split(',');

        for (let i = 1; i < rows.length; i++) {
          const values = rows[i].split(',');
          const obj = {};
          headers.forEach((header, index) => {
            obj[header] = values[index];
          });
          evData.push(obj);
        }
        resolve(evData);
      });
    };

    const data = await parseCSV(csvText);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: 'Failed to load data' }), {
      status: 500,
    });
  }
}
