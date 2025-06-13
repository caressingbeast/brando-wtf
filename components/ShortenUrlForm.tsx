"use client"

import type React from "react";

import { useState, useTransition } from "react";
import { Check, Copy, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { shortenUrl } from "@/lib/actions";

export function ShortenUrlForm() {
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!url) {
      toast("Please enter a valid URL.");
      return;
    }

    startTransition(async () => {
      try {
        const result = await shortenUrl(url);
        setShortUrl(result);
        toast("URL shortened successfully!");
      } catch (error) {
        // error
      }
    });
  }

  const copyToClipboard = async () => {
    if (!shortUrl) return;

    try {
      await navigator.clipboard.writeText(`https://brando.wtf/s/${shortUrl}`);
      setCopied(true);
      toast("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      toast("Failed to copy URL.");
    }
  }

  return (
    <Card className="bg-zinc-800/50 border-zinc-700">
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              className="flex-1 bg-zinc-900 border-zinc-700 text-white"
              placeholder="https://example.com/very-long-url-that-needs-shortening"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button type="submit" disabled={isPending || !url} className="bg-rose-500 hover:bg-rose-600 text-white">
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Shortening...
                </>
              ) : (
                "Shorten"
              )}
            </Button>
          </div>
        </form>

        {shortUrl && (
          <div className="mt-4 p-3 bg-zinc-900 rounded-md flex items-center justify-between">
            <span className="font-mono text-rose-400">brando.wtf/s/{shortUrl}</span>
            <Button size="sm" variant="ghost" onClick={copyToClipboard} className="text-zinc-400 hover:text-white">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
