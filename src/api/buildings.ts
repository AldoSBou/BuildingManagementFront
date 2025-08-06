import client from './client';

export async function getBuilding(id: number) {
  const res = await client.get(`buildings/${id}`);
  return res.data.data;
}