// src/app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from "next/server";

const API_BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://cvr4l6tc-3000.euw.devtunnels.ms";

/** Remove hop-by-hop headers that shouldn't be forwarded back to the client */
function sanitizeResponseHeaders(headers: Headers): Record<string, string> {
  const obj = Object.fromEntries(headers.entries()) as Record<string, string>;
  // remove headers that can break NextResponse or are hop-by-hop
  delete obj["transfer-encoding"];
  delete obj["content-encoding"];
  delete obj["connection"];
  delete obj["keep-alive"];
  delete obj["proxy-authenticate"];
  delete obj["proxy-authorization"];
  delete obj["te"];
  delete obj["trailer"];
  delete obj["upgrade"];
  // content-length may be removed because NextResponse will set its own
  delete obj["content-length"];
  return obj;
}

/** build full target url from base + path segments + search */
function buildTargetUrl(base: string, pathArr: string[], search: string) {
  const baseNoSlash = base.replace(/\/$/, "");
  const pathPart = (pathArr || []).filter(Boolean).join("/");
  return (pathPart ? `${baseNoSlash}/${pathPart}` : baseNoSlash) + (search ?? "");
}

/** main proxy routine */
async function proxy(req: NextRequest, context: unknown) {
  // narrow the unknown context to the shape we expect
  const ctx = context as { params?: { path?: string[] } } | undefined;
  const pathArr = ctx?.params?.path ?? [];

  const targetUrl = buildTargetUrl(API_BASE, pathArr, req.nextUrl.search);

  // forward headers from incoming request
  const incomingHeaders = Object.fromEntries(req.headers.entries()) as Record<string, string>;
  // prevent host mismatch
  delete incomingHeaders["host"];

  const init: RequestInit = {
    method: req.method,
    headers: incomingHeaders,
    // send body only for non-GET/HEAD/OPTIONS (OPTIONS we forward but usually no body)
    body: req.method && !["GET", "HEAD"].includes(req.method) ? await req.text() : undefined,
    // keep credentials mode default (server -> server)
  };

  const res = await fetch(targetUrl, init);

  // if response is JSON, return JSON; otherwise return text
  const contentType = res.headers.get("content-type") ?? "";

  const forwardedHeaders = sanitizeResponseHeaders(res.headers);

  if (contentType.includes("application/json")) {
    const json = await res.json();
    return NextResponse.json(json, { status: res.status, headers: forwardedHeaders });
  } else {
    const text = await res.text();
    return new NextResponse(text, { status: res.status, headers: forwardedHeaders });
  }
}

/** exports for HTTP methods — note: second arg typed as `unknown` (avoids `any`) */
export async function GET(req: NextRequest, context: unknown) {
  return proxy(req, context);
}
export async function POST(req: NextRequest, context: unknown) {
  return proxy(req, context);
}
export async function PUT(req: NextRequest, context: unknown) {
  return proxy(req, context);
}
export async function DELETE(req: NextRequest, context: unknown) {
  return proxy(req, context);
}
export async function PATCH(req: NextRequest, context: unknown) {
  return proxy(req, context);
}
export async function OPTIONS(req: NextRequest, context: unknown) {
  // forward OPTIONS too (preflight) — proxy will forward; or you could respond here with
  // Access-Control-Allow-* headers if you prefer to handle preflight on Vercel side.
  return proxy(req, context);
}
