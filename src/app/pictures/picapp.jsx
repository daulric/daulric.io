"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function LoadImage({ image, onClick }) {
  return (
    <Card className="w-full max-w-xs bg-gray-800 hover:bg-gray-700 transition-colors cursor-pointer border-gray-700" onClick={() => onClick(image)}>
      <CardContent className="p-0">
        <Image
          src={image.url}
          alt={image.data.name}
          className="w-full h-64 object-cover rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
          width={150}
          height={150}
          priority
        />
      </CardContent>
    </Card>
  );
}

async function GetImages() {
  noStore();
  try {
    const response = await axios.get("/api/pictures", {
      params: { descending: true }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching Images", error);
    return [];
  }
}

export default function PicturePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function loadImages() {
      const fetchedImages = await GetImages();
      setImages(fetchedImages);
    }
    loadImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <section className="bg-gray-800 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Anonymous Pictures</h1>
            <p className="text-xl mb-8">List of Pictures Uploaded By Random People</p>
            <Link href="/pictures/upload" passHref>
              <Button variant="default" size="lg" className="bg-blue-600 hover:bg-blue-700">
                Upload Picture
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Image Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((image) => (
            <LoadImage key={image.id} image={image} onClick={setSelectedImage} />
          ))}
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl bg-gray-800 border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-gray-100">{selectedImage?.data.name}</DialogTitle>
            <DialogDescription className="text-gray-300">
              Click outside to close
            </DialogDescription>
          </DialogHeader>
          {selectedImage && (
            <div className="relative w-full h-[80vh]">
              <Image
                src={selectedImage.url}
                alt={selectedImage.data.name}
                className="object-contain"
                fill
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}