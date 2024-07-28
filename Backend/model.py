import os
import numpy as np
import librosa
import soundfile as sf
from pyttsx3 import init
import noisereduce as nr
from pydub import AudioSegment

count = 1
timestamps = []

def audio_generation(text, sentiment):
    sentiment_dir_path = get_sentiment_directory(sentiment)
    return generate_tts_with_sentiment(text, sentiment_dir_path, sentiment)

def get_sentiment_directory(sentiment):
    sentiment_dirs = {
        'fear': 'fear',
        'happy': 'happy',
        'disgust': 'disgust',
        'sad': 'sad',
        'surprise': 'surprise',
        'neutral': 'neutral',
        'angry': 'angry'
    }
    return sentiment_dirs.get(sentiment, '')

def generate_tts_with_sentiment(text, sentiment_dir_path, sentiment):
    global count
    tts_engine = init()
    tts_engine.setProperty('rate', 190)
    tts_engine.setProperty('volume', 0.8)
    
    tts_temp_file = 'hello_world_temp.wav'
    tts_engine.save_to_file(text, tts_temp_file)
    tts_engine.runAndWait()
    
    output_file = f'{sentiment}_{count}.wav'
    count += 1
    y, sr = librosa.load(tts_temp_file, sr=None)
    
    pitch_shift = determine_pitch_shift(sentiment)
    y_shifted = librosa.effects.pitch_shift(y, sr=sr, n_steps=pitch_shift)
    
    speed_factor = determine_speed_factor(sentiment)
    y_stretched = librosa.effects.time_stretch(y_shifted, rate=speed_factor)
    
    volume_gain = determine_volume_gain(sentiment)
    y_stretched = y_stretched * (10 ** (volume_gain / 20.0))
    
    y_reduced_noise = nr.reduce_noise(y=y_stretched, sr=sr)
    y_normalized = librosa.util.normalize(y_reduced_noise)
    y_final = np.clip(y_normalized, -1.0, 1.0)
    
    sf.write(output_file, y_final, sr)
    
    combined_audio = AudioSegment.from_wav(output_file)
    combined_audio_duration = combined_audio.duration_seconds
    minutes, seconds = divmod(combined_audio_duration, 60)
    print(f'Generated audio saved as {output_file}')
    # print(f'Duration: {int(minutes)} minutes {int(seconds)} seconds')
    time_cal = minutes*60+  seconds
    
    return output_file , time_cal

def determine_pitch_shift(sentiment):
    pitch_shifts = {
        'happy': 1,
        'sad': -1,
        'fear': 0.5,
        'disgust': -0.5,
        'surprise': 1,
        'neutral': 0,
        'angry': 0.5
    }
    return pitch_shifts.get(sentiment, 0)

def determine_speed_factor(sentiment):
    speed_factors = {
        'happy': 1.0,
        'sad': 0.9,
        'fear': 1.05,
        'disgust': 0.95,
        'surprise': 1.1,
        'neutral': 1.0,
        'angry': 1.05
    }
    return speed_factors.get(sentiment, 1.0)

def determine_volume_gain(sentiment):
    volume_gains = {
        'happy': 6,
        'sad': -1,
        'fear': 1.5,
        'disgust': -1,
        'surprise': 2,
        'neutral': 0,
        'angry': 5
    }
    return volume_gains.get(sentiment, 0)