import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UploadButton } from './components/UploadButton';
import { ActionButton } from './components/ActionButton';
import { ImageDisplay } from './components/ImageDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { partyfyImage } from './services/geminiService';
import { Download, PartyPopper } from 'lucide-react';
import { FileInfo } from './types';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<FileInfo | null>(null);
  const [partifiedImage, setPartifiedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (fileInfo: FileInfo) => {
    setOriginalImage(fileInfo);
    setPartifiedImage(null);
    setError(null);
  };

  const handlePartyfy = useCallback(async () => {
    if (!originalImage) {
      setError('Please upload an image first!');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPartifiedImage(null);

    try {
      const result = await partyfyImage(originalImage.base64, originalImage.mimeType);
      setPartifiedImage(result);
    } catch (err) {
      setError('Failed to Partyfy the image. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage]);

  const handleDownload = () => {
    if (!partifiedImage) return;
    const link = document.createElement('a');
    link.href = partifiedImage;
    link.download = 'partified-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen text-white flex flex-col items-center p-4">
      <main className="flex-grow flex flex-col items-center justify-center space-y-6 w-full">
        <Header />
        <p className="text-lg md:text-xl text-center text-pink-400 -mt-2">
          Get your party face on — just for fun!
        </p>

        <div className="w-full max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-pink-500/30 shadow-2xl shadow-pink-500/10">
          <div className="space-y-6">
            {!originalImage && <UploadButton onImageUpload={handleImageUpload} />}
            
            <ImageDisplay 
              originalImage={originalImage?.base64 || null}
              partifiedImage={partifiedImage}
              isLoading={isLoading}
            />
            
            {error && <p className="text-center text-red-400 animate-pulse">{error}</p>}
            
            {isLoading && <LoadingSpinner />}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {originalImage && !isLoading && (
                <ActionButton
                  onClick={handlePartyfy}
                  disabled={isLoading}
                  className="bg-pink-500 hover:bg-pink-600 shadow-pink-500/50"
                >
                  <PartyPopper className="w-5 h-5 mr-2" />
                  Partyfy Me
                </ActionButton>
              )}

              {partifiedImage && !isLoading && (
                <ActionButton
                  onClick={handleDownload}
                  className="bg-blue-500 hover:bg-blue-600 shadow-blue-500/50"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download
                </ActionButton>
              )}
            </div>
            {originalImage && !isLoading && (
              <button 
                onClick={() => {
                  setOriginalImage(null);
                  setPartifiedImage(null);
                  setError(null);
                }}
                className="w-full text-center text-gray-400 hover:text-white transition-colors duration-300 mt-2"
              >
                Start Over
              </button>
            )}
          </div>
        </div>
      </main>
      {partifiedImage && !isLoading && (
        <p className="text-center text-gray-400 text-sm mt-4 mb-2 max-w-md mx-auto">
          This is an AI-generated image. Don't love the result? Give it another go! We hope you have fun.
        </p>
      )}
      <footer className="w-full text-center text-gray-500 text-sm py-4">
        <p>
          &copy; {new Date().getFullYear()} Drunkify. All rights reserved.
        </p>
        <p>
          Created by <a href="https://www.linkedin.com/in/pardeepkhatri/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">Pardeep Khatri</a>
        </p>
      </footer>
    </div>
  );
};

export default App;