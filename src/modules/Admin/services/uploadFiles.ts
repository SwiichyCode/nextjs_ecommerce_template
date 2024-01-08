import type { PutBlobResult } from "@vercel/blob";

// This function uploads a file and returns the blob result
async function uploadFile(file: File): Promise<PutBlobResult> {
  const response = await fetch(
    `/api/products/image/upload?filename=${file.name}`,
    {
      method: "POST",
      body: file,
    },
  );
  const newBlob = (await response.json()) as PutBlobResult;
  return newBlob;
}

// This function uploads multiple files and returns an array of URLs
export async function uploadFiles(files: File[]): Promise<string[]> {
  const blobResults: PutBlobResult[] = [];
  for (const file of files) {
    const newBlob = await uploadFile(file);
    blobResults.push(newBlob);
  }
  return blobResults.map((blob) => blob.url);
}
