import { NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'https://next-js-basic-production-7afe.up.railway.app';

export async function GET(request, context) {
  try {
    const params = await context.params;
    const response = await fetch(`${API_URL}/items/${params.id}`, {
      cache: 'no-store'
    });
    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to fetch item' },
      { status: 500 }
    );
  }
}