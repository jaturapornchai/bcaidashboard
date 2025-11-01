'use client';

import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Play, Pause, Loader2 } from 'lucide-react';

interface TTSPlayerProps {
  text: string;
  className?: string;
}

// เสียงไทยที่ดีที่สุดจาก ElevenLabs
const THAI_VOICES = {
  premium: {
    id: '21m00Tcm4TlvDq8ikWAM', // Rachel - เสียงผู้หญิงอเมริกัน ชัดเจน
    name: 'Rachel (Premium)'
  },
  thai_male: {
    id: 'ErXwobaYiN019PkySvjV', // Antoni - เสียงผู้ชาย
    name: 'Antoni (Thai Compatible)'
  }
};

export function TTSPlayer({ text, className = "" }: TTSPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // เล่นเสียงผ่าน ElevenLabs
  const speak = useCallback(async () => {
    if (!text || text.trim().length === 0) {
      alert('ไม่มีข้อความให้อ่าน');
      return;
    }

    setIsLoading(true);

    try {
      // หยุดเสียงปัจจุบัน
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }

      // เรียก ElevenLabs API
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voice: THAI_VOICES.premium.id // ใช้เสียง Rachel ที่ชัดเจน
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const data = await response.json();
      
      if (data.success && data.audioData) {
        // สร้าง audio element
        const audio = new Audio(data.audioData);
        
        audio.onloadstart = () => {
          setIsLoading(false);
          setIsPlaying(true);
          setIsPaused(false);
        };

        audio.onended = () => {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentAudio(null);
        };

        audio.onerror = () => {
          setIsPlaying(false);
          setIsPaused(false);
          setCurrentAudio(null);
          setIsLoading(false);
          alert('เกิดข้อผิดพลาดในการเล่นเสียง');
        };

        setCurrentAudio(audio);
        audio.play();
      } else {
        throw new Error('Invalid response from TTS service');
      }
    } catch (error) {
      console.error('TTS Error:', error);
      setIsLoading(false);
      setIsPlaying(false);
      setIsPaused(false);
      setCurrentAudio(null);
      alert('เกิดข้อผิดพลาดในการสร้างเสียง กรุณาลองใหม่อีกครั้ง');
    }
  }, [text, currentAudio]);

  // หยุดเสียง
  const stop = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    setIsPlaying(false);
    setIsPaused(false);
    setCurrentAudio(null);
  }, [currentAudio]);

  // หยุดชั่วคราว
  const pause = useCallback(() => {
    if (currentAudio && isPlaying) {
      currentAudio.pause();
      setIsPaused(true);
    }
  }, [currentAudio, isPlaying]);

  // ดำเนินการต่อ
  const resume = useCallback(() => {
    if (currentAudio && isPaused) {
      currentAudio.play();
      setIsPaused(false);
    }
  }, [currentAudio, isPaused]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button
        onClick={isPlaying ? stop : speak}
        disabled={isLoading}
        variant={isPlaying ? "destructive" : "default"}
        size="sm"
        className="flex items-center gap-2"
      >
        {isLoading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            กำลังสร้างเสียง...
          </>
        ) : isPlaying ? (
          <>
            <VolumeX className="h-4 w-4" />
            หยุด
          </>
        ) : (
          <>
            <Volume2 className="h-4 w-4" />
            อ่านให้ฟัง (ElevenLabs)
          </>
        )}
      </Button>

      {isPlaying && (
        <Button
          onClick={isPaused ? resume : pause}
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
        >
          {isPaused ? (
            <>
              <Play className="h-4 w-4" />
              เล่นต่อ
            </>
          ) : (
            <>
              <Pause className="h-4 w-4" />
              หยุดชั่วคราว
            </>
          )}
        </Button>
      )}
    </div>
  );
}

// Component สำหรับเล่นเสียง AI response
export function AIResponsePlayer({ response }: { response: string }) {
  const [showPlayer, setShowPlayer] = useState(false);

  return (
    <div className="mt-4">
      <Button
        onClick={() => setShowPlayer(!showPlayer)}
        variant="outline"
        size="sm"
        className="flex items-center gap-2 mb-2"
      >
        <Volume2 className="h-4 w-4" />
        {showPlayer ? 'ซ่อน' : 'เปิด'} ตัวเล่นเสียง ElevenLabs
      </Button>

      {showPlayer && (
        <TTSPlayer 
          text={response} 
          className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200"
        />
      )}
    </div>
  );
}

// ฟังก์ชันสำหรับทดสอบเสียง
export function testElevenLabsVoice() {
  const testTexts = [
    'สวัสดีครับ ผมเป็น AI ที่ปรึกษาธุรกิจ SMEs ไทย',
    'ยินดีต้อนรับสู่ระบบ BC AI Dashboard',
    'ข้อมูลธุรกิจของคุณมีแนวโน้มเติบโตดีมาก'
  ];

  testTexts.forEach((text, index) => {
    setTimeout(async () => {
      try {
        const response = await fetch('/api/tts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: text,
            voice: '21m00Tcm4TlvDq8ikWAM'
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.audioData) {
            const audio = new Audio(data.audioData);
            audio.play();
          }
        }
      } catch (error) {
        console.error('Test voice error:', error);
      }
    }, index * 3000); // ห่างกัน 3 วินาที
  });
}