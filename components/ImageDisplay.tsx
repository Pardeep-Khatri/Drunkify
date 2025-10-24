
import React from 'react';

interface ImageDisplayProps {
  originalImage: string | null;
  partifiedImage: string | null;
  isLoading: boolean;
}

const ImageCard: React.FC<{ src: string | null; title: string; isLoading?: boolean }> = ({ src, title, isLoading }) => (
  <div className="w-full flex flex-col items-center">
    <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-2">{title}</h3>
    <div className="aspect-square w-full rounded-lg bg-gray-900/50 flex items-center justify-center overflow-hidden border border-gray-700">
      {isLoading ? (
        <div className="text-gray-500">Processing...</div>
      ) : src ? (
        <img src={src} alt={title} className="w-full h-full object-contain" />
      ) : (
        <div className="text-gray-500">Your image here</div>
      )}
    </div>
  </div>
);

export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, partifiedImage, isLoading }) => {
  if (!originalImage && !partifiedImage) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <ImageCard src={originalImage} title="Original" />
      <ImageCard src={partifiedImage} title="Partified!" isLoading={isLoading && !partifiedImage} />
    </div>
  );
};
