import React, { useState } from 'react';
import { FaFacebook, FaYoutube } from 'react-icons/fa';
import { SiTiktok } from 'react-icons/si';
import { FaXTwitter } from 'react-icons/fa6';
import { BsFileEarmarkPlay, BsFileEarmarkMusic } from 'react-icons/bs';

function App() {
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [url, setUrl] = useState('');
  const [downloadType, setDownloadType] = useState('video');
  const [selectedQuality, setSelectedQuality] = useState('');

  const platforms = [
    { name: 'X', icon: FaXTwitter, color: 'text-white', domain: 'twitter.com|x.com' },
    { name: 'Facebook', icon: FaFacebook, color: 'text-blue-400', domain: 'facebook.com|fb.com' },
    { name: 'YouTube', icon: FaYoutube, color: 'text-red-600', domain: 'youtube.com|youtu.be' },
    { name: 'TikTok', icon: SiTiktok, color: 'text-white', domain: 'tiktok.com' }
  ];

  const videoQualities = [
    { quality: '1080p', format: 'MP4' },
    { quality: '720p', format: 'MP4' },
    { quality: '480p', format: 'MP4' }
  ];
  
  const audioFormats = [
    { quality: '320kbps', format: 'MP3' },
    { quality: '256kbps', format: 'MP3' },
    { quality: '128kbps', format: 'MP3' }
  ];

  const handlePlatformSelect = (platform) => {
    setSelectedPlatform(platform);
  };

  const detectPlatform = (url) => {
    try {
      const urlObject = new URL(url);
      const hostname = urlObject.hostname;
      
      const platform = platforms.find(p => 
        new RegExp(p.domain).test(hostname)
      );
      
      if (platform) {
        setSelectedPlatform(platform);
      }
    } catch (error) {
      // Invalid URL, do nothing
    }
  };

  const handleUrlChange = (e) => {
    const newUrl = e.target.value;
    setUrl(newUrl);
    detectPlatform(newUrl);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url) {
      alert('Por favor ingresa una URL');
      return;
    }
    if (!selectedQuality) {
      alert('Por favor selecciona una calidad');
      return;
    }
    // Aquí iría la lógica para procesar la descarga
    console.log(`Descargando ${downloadType} de ${selectedPlatform?.name} en calidad ${selectedQuality}: ${url}`);
  };

  const handleTypeChange = (type) => {
    setDownloadType(type);
    setSelectedQuality(''); // Reset quality when changing type
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-white">
        Descargador de Videos
      </h1>
      
      <div className="flex flex-wrap justify-center gap-8 mb-8">
        {platforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handlePlatformSelect(platform)}
            className={`p-6 rounded-lg transition-transform hover:scale-110 ${
              selectedPlatform?.name === platform.name
                ? 'bg-gray-700'
                : 'bg-gray-800'
            } shadow-lg`}
          >
            <platform.icon
              className={`text-6xl ${platform.color}`}
              title={platform.name}
            />
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={url}
            onChange={handleUrlChange}
            placeholder="Pega aquí el enlace del video"
            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 justify-center">
              <button
                type="button"
                onClick={() => handleTypeChange('video')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  downloadType === 'video'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <BsFileEarmarkPlay className="text-xl" />
                Video
              </button>
              <button
                type="button"
                onClick={() => handleTypeChange('audio')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  downloadType === 'audio'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <BsFileEarmarkMusic className="text-xl" />
                Audio
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              {(downloadType === 'video' ? videoQualities : audioFormats).map((item) => (
                <button
                  key={item.quality}
                  type="button"
                  onClick={() => setSelectedQuality(`${item.quality} ${item.format}`)}
                  className={`px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedQuality === `${item.quality} ${item.format}`
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <span className="font-semibold">{item.quality}</span>
                    <span className="text-xs opacity-75">{item.format}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!selectedPlatform || !url || !selectedQuality}
            className={`w-full py-3 rounded-lg font-semibold text-white transition-colors ${
              selectedPlatform && url && selectedQuality
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-600 cursor-not-allowed'
            }`}
          >
            Descargar {downloadType === 'audio' ? 'Audio' : 'Video'}
            {selectedQuality && ` (${selectedQuality})`}
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;