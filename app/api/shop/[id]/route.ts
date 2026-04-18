import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const shop = await prisma.shop.findUnique({
      where: { id },
      include: {
        products: true,
        orders: true,
      },
    });
    if (!shop) {
      return NextResponse.json(
        { error: "Shop not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(shop);
  } catch (error) {
    console.error("Error fetching shop:", error);
    return NextResponse.json(
      { error: "Failed to fetch shop" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const shop = await prisma.shop.update({
      where: { id },
      data: {
        name: body.name,
        shopifyDomain: body.shopifyDomain,
        region: body.region,
        currency: body.currency,
        taxMode: body.taxMode,
        apiKey: body.apiKey,
        apiSecret: body.apiSecret,
        accessToken: body.accessToken,
        authorized: body.authorized,
        syncEnabled: body.syncEnabled,
        lastSyncedAt: body.lastSyncedAt,
      },
    });
    return NextResponse.json(shop);
  } catch (error) {
    console.error("Error updating shop:", error);
    return NextResponse.json(
      { error: "Failed to update shop" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.shop.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Shop deleted" });
  } catch (error) {
    console.error("Error deleting shop:", error);
    return NextResponse.json(
      { error: "Failed to delete shop" },
      { status: 500 }
    );
  }
}