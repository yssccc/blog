import { put } from '@vercel/blob';
import { randomUUID } from 'crypto';

export async function savePreview(mdx: string) {
  const id = randomUUID();
  const filename = `preview/${id}.json`;

  const { url } = await put(filename, JSON.stringify({ mdx }), {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return { id, url };
}

export async function loadPreviewFromBlob(url: string) {
  const data = await fetch(url).then((res) => res.json());
  return data.mdx;
}
