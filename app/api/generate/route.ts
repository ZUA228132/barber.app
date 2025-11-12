
import OpenAI from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { face, hair, beard } = await req.json();

    const prompt = `Barbershop hair style preview, photorealistic portrait, male.
Face shape: ${face}. Hair length: ${hair}. Beard: ${beard}.
Studio lighting, premium editorial look, sharp focus, neutral background.`;

    const img = await client.images.generate({
      model: "gpt-image-1",
      prompt,
      size: "1024x1024"
    });

    const b64 = img.data?.[0]?.b64_json;
    if (!b64) {
      const url = (img.data?.[0] as any)?.url;
      if (url) return NextResponse.json({ url });
      throw new Error("Image generation returned no data");
    }

    const dataUrl = `data:image/png;base64,${b64}`;
    return NextResponse.json({ url: dataUrl });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Generation failed" }, { status: 500 });
  }
}
