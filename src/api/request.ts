type Params = {
  method: string,
  headers?: HeadersInit,
  body?: any
}
export default async function <Data>(url: string, params:Params): Promise<Data> {
  const res = await fetch(url, params)
  if (!res.ok) {
    throw new Error(res.statusText)
  }
  const data: Data = await res.json();
  return data
}