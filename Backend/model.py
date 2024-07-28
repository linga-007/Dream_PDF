import os
import numpy as np
import librosa
import soundfile as sf
from pyttsx3 import init
from pydub import AudioSegment
import random

count = 1

def audio_generation(text, sentiment):
    sentiment_dir_path = get_sentiment_directory(sentiment)
    # example_file = select_random_file(sentiment_dir_path)  # Example file for demonstration, not used directly
    return generate_tts_with_sentiment(text, sentiment)

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

def generate_tts_with_sentiment(text, sentiment):
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

    settings = {
        'pitch_shift': determine_pitch_shift(sentiment),
        'speed_factor': determine_speed_factor(sentiment),
        'volume_gain': determine_volume_gain(sentiment)
    }

    y_shifted = librosa.effects.pitch_shift(y, sr=sr, n_steps=settings['pitch_shift'])
    y_stretched = librosa.effects.time_stretch(y_shifted, rate=settings['speed_factor'])
    y_adjusted = y_stretched * (10 ** (settings['volume_gain'] / 20.0))
    
    y_normalized = librosa.util.normalize(y_adjusted)
    y_final = np.clip(y_normalized, -1.0, 1.0)
    
    sf.write(output_file, y_final, sr)
    
    combined_audio = AudioSegment.from_wav(output_file)
    combined_audio_duration = combined_audio.duration_seconds
    minutes, seconds = divmod(combined_audio_duration, 60)
    time_cal = minutes * 60 + seconds
    
    return output_file, time_cal

def determine_pitch_shift(sentiment):
    pitch_shifts = {
        'happy': 2.5,      # Increased pitch for cheerfulness
        'sad': -1.5,       # Decreased pitch for sadness
        'fear': 1.3,       # Slightly increased pitch for fear
        'disgust': -1.2,   # Decreased pitch for disgust
        'surprise': 2.5,   # Increased pitch for surprise
        'neutral': 0.0,    # Neutral pitch
        'angry': 1.0       # Slightly increased pitch for anger
    }
    return pitch_shifts.get(sentiment, 0.0)

def determine_speed_factor(sentiment):
    speed_factors = {
        'happy': 1.0,      # Slightly faster for happiness
        'sad': 0.8,        # Slower for sadness
        'fear': 1.0,       # Slightly faster for fear
        'disgust': 0.9,    # Slightly slower for disgust
        'surprise': 1.0,   # Faster for surprise
        'neutral': 1.0,    # Normal speed for neutral
        'angry': 1.0       # Slightly faster for anger
    }
    return speed_factors.get(sentiment, 1.0)

def determine_volume_gain(sentiment):
    volume_gains = {
        'happy': 8,        # Increased volume for happiness
        'sad': -3,         # Decreased volume for sadness
        'fear': 3,         # Increased volume for fear
        'disgust': -2,     # Decreased volume for disgust
        'surprise': 6,     # Increased volume for surprise
        'neutral': 0,      # Normal volume for neutral
        'angry': 5         # Increased volume for anger
    }
    return volume_gains.get(sentiment, 0)

def select_random_file(folder_path):
    files = [os.path.join(folder_path, f) for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
    return random.choice(files) if files else None
