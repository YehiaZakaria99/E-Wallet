import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = "https://cvr4l6tc-3000.euw.devtunnels.ms";

async function handleRequest(req: NextRequest, method: string, path: string[]) {
  const targetPath = path.join("/");
  const url = `${BACKEND_URL}/${targetPath}${req.nextUrl.search}`;

  let body: string | undefined;
  if (method !== "GET" && method !== "HEAD") {
    body = await req.text();
  }

  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  // جرّب ترجّع JSON لو السيرفر رجّع JSON
  try {
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    // fallback لو الرد مش JSON
    const text = await res.text();
    return new NextResponse(text, { status: res.status });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(req, "GET", params.path);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(req, "POST", params.path);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(req, "PUT", params.path);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  return handleRequest(req, "DELETE", params.path);
}
