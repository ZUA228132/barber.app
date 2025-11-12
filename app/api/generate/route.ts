
import OpenAI, { toFile } from "openai";
import { NextResponse } from "next/server";

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      const face = String(form.get('face') || 'oval');
      const hair = String(form.get('hair') || 'short');
      const beard = String(form.get('beard') || 'none');
      const photo = form.get('photo') as File | null;

      if (!photo) throw new Error('No photo provided');

      const prompt = `Style transfer / edit: keep the original person. Apply barbershop makeover.
Face shape reference: ${face}. Desired hair length: ${hair}. Beard style: ${beard}.
Keep natural skin, preserve identity, realistic lighting, premium studio look.`;

      const openaiFile = await toFile(Buffer.from(await photo.arrayBuffer()), 'photo.png');

      const res = await client.images.edits({
        model: "gpt-image-1",
        image: [openaiFile],
        prompt,
        size: "1024x1024"
      });

      const b64 = res.data?.[0]?.b64_json;
      if (!b64) {
        const url = (res.data?.[0] as any)?.url;
        if (url) return NextResponse.json({ url });
        throw new Error("Image edit returned no data");
      }
      return NextResponse.json({ url: `data:image/png;base64,${b64}` });
    } else {
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
      return NextResponse.json({ url: `data:image/png;base64,${b64}` });
    }
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: e.message || "Generation failed" }, { status: 500 });
  }
}
