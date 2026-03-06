type GenerateInput = {
  prompt: string;
  imageDataUrl: string;
};

type PoeChatResponse = {
  choices?: Array<{
    message?: {
      content?:
        | string
        | Array<{
            type?: string;
            text?: string;
            image_url?: {
              url?: string;
            };
          }>;
    };
  }>;
};

const httpUrlPattern = /(https?:\/\/[^\s)\]"']+)/i;

function extractFirstHttpUrl(value: string): string | null {
  const match = value.match(httpUrlPattern);
  return match?.[1] ?? null;
}

function normalizeImageUrl(response: PoeChatResponse): string {
  const content = response.choices?.[0]?.message?.content;

  if (typeof content === "string") {
    const trimmed = content.trim();
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed;
    }

    const inline = extractFirstHttpUrl(trimmed);
    if (inline) {
      return inline;
    }
  }

  if (Array.isArray(content)) {
    for (const part of content) {
      if (part.type === "image_url" && part.image_url?.url) {
        return part.image_url.url;
      }

      if (part.type === "text" && part.text) {
        const inline = extractFirstHttpUrl(part.text);
        if (inline) {
          return inline;
        }
      }
    }
  }

  throw new Error("Poe response did not include an image URL.");
}

export async function generateCaricatureWithPoe({ prompt, imageDataUrl }: GenerateInput) {
  const poeKey = process.env.POE_API_KEY;
  const poeModel = process.env.POE_MODEL ?? "nano-banana-2";

  if (!poeKey) {
    throw new Error("Missing POE_API_KEY.");
  }

  const response = await fetch("https://api.poe.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${poeKey}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      model: poeModel,
      stream: false,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Generate a caricature image. ${prompt}`,
            },
            {
              type: "image_url",
              image_url: {
                url: imageDataUrl,
              },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Poe request failed with ${response.status}: ${text}`);
  }

  const payload = (await response.json()) as PoeChatResponse;
  return normalizeImageUrl(payload);
}
