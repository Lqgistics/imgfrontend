"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Image {
  id: string;
  name: string;
  url: string;
  api_version: string;
}

export default function LibraryPage() {
  const [images, setImages] = useState<Image[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedLinks, setCopiedLinks] = useState<{ [key: string]: boolean }>(
    {}
  );
  const { toast } = useToast();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const token = Cookies.get("token"); // Replace 'token' with the name of your cookie
        if (!token) {
          throw new Error("No token found");
        }

        const response = await axios.get<Image[]>(
          "https://api.dbrad.engineer/files",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setImages(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch images. Please try again later.");
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  const handleCopyLink = (id: string, url: string) => {
    const fullUrl = `https://${url}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopiedLinks({ ...copiedLinks, [id]: true });
      toast({
        title: "Link Copied",
        description: "The sharing link has been copied to your clipboard.",
      });
      setTimeout(() => {
        setCopiedLinks({ ...copiedLinks, [id]: false });
      }, 2000);
    });
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-red-500">{error}</div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Image Library</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0">
              <img
                src={`https://${image.url}`}
                alt={image.name}
                className="w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
            </CardContent>
            <CardFooter className="p-2 flex justify-between items-center">
              <p className="text-sm font-medium truncate">{image.name}</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopyLink(image.id, image.url)}
                    >
                      {copiedLinks[image.id] ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{copiedLinks[image.id] ? "Copied!" : "Copy link"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
