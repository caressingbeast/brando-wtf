"use server";

import { revalidatePath } from "next/cache";

import prisma from "./db";

import { generateShortCode } from "./url";

export async function shortenUrl(url: string): Promise<string> {
  // Validate URL
  try {
    const urlObj = new URL(url);
    if (!urlObj.protocol.startsWith("http")) {
      throw new Error("URL must start with http:// or https://");
    }
  } catch (error) {
    throw new Error("Please enter a valid URL");
  }

  // Generate a unique short code
  let shortCode = generateShortCode();
  let isUnique = false;

  // Ensure the short code is unique
  while (!isUnique) {
    const existing = await prisma.shortenedUrl.findUnique({
      where: { shortCode },
    });
    if (!existing) {
      isUnique = true;
    } else {
      shortCode = generateShortCode();
    }
  }

  // Save the linking
  await prisma.shortenedUrl.create({
    data: {
      originalUrl: url,
      shortCode,
    },
  });

  revalidatePath("/");
  return shortCode;
}

export async function getUrlByShortCode(shortCode: string): Promise<string | null> {
  const url = await prisma.shortenedUrl.findUnique({
    where: { shortCode },
  });

  console.log("shortCode", shortCode, url);

  if (!url) {
    return null;
  }

  // Increment click count
  await prisma.shortenedUrl.update({
    where: { id: url.id },
    data: { clicks: { increment: 1 } },
  });

  return url.originalUrl;
}
