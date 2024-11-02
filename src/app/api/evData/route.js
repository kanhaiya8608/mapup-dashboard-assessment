// app/api/evData/route.js
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const filePath = path.resolve(process.cwd(), 'data-to-visualize/Electric_Vehicle_Population_Data.csv');

export async function GET(req) {
  const evData = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => evData.push(row))
      .on('end', () => {
        resolve(new Response(JSON.stringify(evData), {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        }));
      })
      .on('error', (error) => {
        console.error(error);
        reject(new Response(JSON.stringify({ error: 'Failed to load data' }), { status: 500 }));
      });
  });
}
