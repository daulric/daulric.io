'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';

function LoadImage(props) {
    const image = props.image
    return (
        <div 
            key={image.data.id} 
            className="cursor-pointer w-full max-w-xs"
            onClick={() => props.click(image)}
        >
            <Image
                src={image.url}
                alt={image.data.name} 
                className="w-full h-64 object-cover rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
                style={{objectFit: "cover"}}
                width={150}
                height={150}
                priority
            />
        </div>
    )
}

async function GetImages() {
    noStore()
    const response = await fetch(`/api/pictures?descending=true`, {
        method: "GET",
    })

    if (!response.ok) {
        console.log("Error fetching Images")
        return [];
    }

    const data = await response.json();
    console.log(data)
    return data
}

export default function PicturePage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [Images, setImages] = useState([])

  useEffect(() => {
    async function loadImages() {
        const images = await GetImages();
        setImages(images)
    }

    loadImages()
  }, [])

  const openImage = (image) => {
    setSelectedImage(image);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <>
        <section className="bg-gray-800 text-white py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-6">Anonymous Pictures</h1>
                    <p className="text-xl mb-8">List of Pictures Uploaded By Random People</p>
                    <Link href="/pictures/upload" className="bg-blue-600 text-white py-3 px-8 rounded-full text-lg font-semibold hover:bg-blue-700 transition duration-300">
                        Upload Picture
                    </Link>
                </div>
            </div>
        </section>
            
        <div className="min-h-screen bg-gray-900 p-8 flex flex-col items-center">
            
            <h1 className="text-3xl font-bold text-white mb-8 text-center">Image Gallery</h1>
            <br/>
            <div className="max-w-6xl w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center">
                {Images.map((image) => (
                    <LoadImage image={image} click={openImage} key={image.id} />
                ))}
                </div>
            </div>

            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={closeImage}>
                    <div className="max-w-4xl max-h-full p-4">
                        <Image 
                            src={selectedImage.url} 
                            alt={selectedImage.alt}
                            className="max-w-full max-h-full object-contain"
                            fill
                        />
                    </div>
                </div>
            )}
        </div>
    </>
  );
}