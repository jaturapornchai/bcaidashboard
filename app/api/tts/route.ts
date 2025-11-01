import { NextRequest, NextResponse } from 'next/server';

const ELEVENLABS_API_KEY = 'sk_cbfc94f782cbcd8a086ecf97d1094e101976da7d214a62dc';

export async function POST(request: NextRequest) {
  try {
    const { text, voice = '21m00Tcm4TlvDq8ikWAM' } = await request.json();

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // ElevenLabs Text-to-Speech API
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_multilingual_v2', // ใช้ model ที่เสถียร
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5,
          style: 0.0,
          use_speaker_boost: true
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ElevenLabs API Error:', errorText);
      return NextResponse.json(
        { error: 'Failed to generate audio from ElevenLabs' },
        { status: 500 }
      );
    }

    // Get audio data as array buffer
    const audioBuffer = await response.arrayBuffer();
    
    // Convert to base64 for client-side audio
    const base64Audio = Buffer.from(audioBuffer).toString('base64');
    
    return NextResponse.json({
      success: true,
      audioData: `data:audio/mpeg;base64,${base64Audio}`,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('TTS API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get available voices from ElevenLabs
export async function GET() {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/voices', {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch voices' },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({
      success: true,
      voices: data.voices
    });

  } catch (error) {
    console.error('Voices API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}