import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const shops = await prisma.shop.findMany({
      include: {
        products: true,
        orders: true,
      },
    });
    return NextResponse.json(shops);
  } catch (error) {
    console.error("Error fetching shops:", error);
    return NextResponse.json(
      { error: "Failed to fetch shops" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const shop = await prisma.shop.create({
      data: {
        name: body.name,
        shopifyDomain: body.shopifyDomain,
        region: body.region,
        currency: body.currency,
        taxMode: body.taxMode,
        apiKey: body.apiKey,
        apiSecret: body.apiSecret,
        accessToken: body.accessToken,
        authorized: body.authorized || false,
        syncEnabled: body.syncEnabled || false,
      },
    });
    return NextResponse.json(shop, { status: 201 });
  } catch (error) {
    console.error("Error creating shop:", error);
    return NextResponse.json(
      { error: "Failed to create shop" },
      { status: 500 }
    );
  }
}