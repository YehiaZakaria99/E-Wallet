// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("❌ Missing NEXT_PUBLIC_BASE_URL in environment variables");
}

type RouteParams = {
  params: { path: string[] };
};

async function handleRequest(
  req: NextRequest,
  { params }: RouteParams
): Promise<NextResponse> {
  const targetPath = params.path.join("/");
  const targetUrl = `${API_BASE_URL}/${targetPath}`;

  const fetchOptions: RequestInit = {
    method: req.method,
    headers: new Headers(req.headers),
    body:
      req.method !== "GET" && req.method !== "HEAD"
        ? await req.text()
        : undefined,
  };

  const response = await fetch(targetUrl, fetchOptions);

  const responseBody = await response.text();

  return new NextResponse(responseBody, {
    status: response.status,
    headers: response.headers,
  });
}

export async function GET(req: NextRequest, ctx: RouteParams) {
  return handleRequest(req, ctx);
}
export async function POST(req: NextRequest, ctx: RouteParams) {
  return handleRequest(req, ctx);
}
export async function PUT(req: NextRequest, ctx: RouteParams) {
  return handleRequest(req, ctx);
}
export async function DELETE(req: NextRequest, ctx: RouteParams) {
  return handleRequest(req, ctx);
}
