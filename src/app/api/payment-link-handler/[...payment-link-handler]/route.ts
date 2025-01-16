export async function POST(req: Request) {
  let body
  try {
    body = req.body ? await req?.json() : {}
  } catch (error) {}
}
