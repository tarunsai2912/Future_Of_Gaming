import React, { useState, useEffect } from 'react';
import { Howl } from 'howler';
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const initialSongs = [
  {
    id: '1',
    title: 'Billie Jean',
    artist: 'Michael Jackson',
    album: 'Thriller 25 Super Deluxe Edition',
    duration: '4:53',
    plays: '1,040,811,064',
    cover: 'https://example.com/billie-jean-cover.jpg'
  },
  // Add more songs here
];

export function MusicPlayer() {
  const [songs, setSongs] = useState(initialSongs);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [howl, setHowl] = useState(null);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(songs);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSongs(items);
  };

  const playSong = (song) => {
    if (howl) {
      howl.unload();
    }

    const newHowl = new Howl({
      src: [song.url],
      html5: true,
      onend: () => {
        setIsPlaying(false);
      }
    });

    setHowl(newHowl);
    setCurrentSong(song);
    setIsPlaying(true);
    newHowl.play();
  };

  const togglePlayPause = () => {
    if (!howl) return;

    if (isPlaying) {
      howl.pause();
    } else {
      howl.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="flex flex-1">
      <div className="flex-1 pr-80">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="songList">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {songs.map((song, index) => (
                  <Draggable key={song.id} draggableId={song.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`p-4 bg-gray-800 rounded-lg ${
                          snapshot.isDragging ? 'opacity-50' : ''
                        } ${currentSong?.id === song.id ? 'border-l-4 border-red-500' : ''}`}
                      >
                        <div className="flex items-center">
                          <img
                            src={song.cover}
                            alt={song.title}
                            className="w-12 h-12 rounded object-cover"
                          />
                          <div className="ml-4 flex-1">
                            <h3 className="text-white font-medium">{song.title}</h3>
                            <p className="text-gray-400 text-sm">{song.artist}</p>
                          </div>
                          <div className="text-gray-400 text-sm">{song.duration}</div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      <div className="fixed right-0 top-0 w-80 h-screen bg-gray-900 p-6">
        {currentSong && (
          <div className="text-white">
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
            <h2 className="text-xl font-bold mb-2">{currentSong.title}</h2>
            <p className="text-gray-400 mb-6">{currentSong.artist}</p>
            
            <div className="flex justify-center items-center space-x-6">
              <button className="text-gray-400 hover:text-white">
                <Shuffle className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipBack className="w-6 h-6" />
              </button>
              <button
                onClick={togglePlayPause}
                className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>
              <button className="text-gray-400 hover:text-white">
                <SkipForward className="w-6 h-6" />
              </button>
              <button className="text-gray-400 hover:text-white">
                <Repeat className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}