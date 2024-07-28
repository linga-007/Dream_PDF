import os
import numpy as np
import librosa
import soundfile as sf
from pydub import AudioSegment
from pyttsx3 import init
import random

# Global variable for file naming
count = 1
setname = ''
time = 0
l=[]

def generate_audio(combined_sentences, file_name):
    
    global setname 
    global time
    setname = file_name
    generated_file = []
    print("************************************ file name is ", setname)
    print("in aud.py", combined_sentences)
    for i in combined_sentences:
        sentences = ''
        for j in i:
            sentences += j
        # print("sentence to be converted to voice is ", sentences)
        audio_generation(sentences, combined_sentences[i])
        generated_file.append(generated_file)
    return l

def audio_generation(text, sentiment):
    toranto_path = os.path.dirname(__file__)
    print(os.listdir(toranto_path))
    
    sentiment_dir = get_sentiment_directory(sentiment)
    sentiment_dir_path = os.path.join(toranto_path, sentiment_dir)
    
    if os.path.isdir(sentiment_dir_path):
        print("folder", os.listdir(sentiment_dir_path))
        emotion_audio_files = get_random_file_from_directory(sentiment_dir_path)
        generate_fear_tts(text, emotion_audio_files)
    else:
        print(f"Directory '{sentiment_dir_path}' does not exist.")

def get_sentiment_directory(sentiment):
    if sentiment == 'fear':
        return 'fear'
    elif sentiment == 'joy':
        return 'happy'
    elif sentiment == 'disgust':
        return 'disgust'
    elif sentiment == 'sadness':
        return 'sad'
    elif sentiment == 'surprise':
        return 'surprise'
    elif sentiment == 'neutral':
        return 'neutral'
    elif sentiment == 'angry':
        return 'angry'
    return ''

def generated_audio_folder():
    output_dir = 'Generated_Audio'
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)
    return output_dir

def generate_fear_tts(text, emotion_audio_files):
    global count  # Declare the global variable to modify it
    tts_engine = init()
    tts_engine.save_to_file(text, 'test.wav')
    tts_engine.runAndWait()
    
    output_dir = generated_audio_folder()
    output_file_path = os.path.join(output_dir, f'{setname}_{count}.wav')
    
    if os.path.isfile(emotion_audio_files):
        fear_audio = AudioSegment.from_file(emotion_audio_files)

        y, sr = librosa.load('test.wav', sr=None)
        y_shifted = librosa.effects.pitch_shift(y, sr=sr, n_steps=2)

        sf.write('test1.wav', y_shifted, sr)

        pitch_shifted_audio = AudioSegment.from_file('test1.wav')
        pitch_shifted_audio = pitch_shifted_audio.set_frame_rate(fear_audio.frame_rate)

        combined_audio = pitch_shifted_audio.overlay(fear_audio)
        combined_audio.export(output_file_path, format='wav')

        # Print the duration of the generated audio file
        combined_audio_duration = combined_audio.duration_seconds
        minutes, seconds = divmod(combined_audio_duration, 60)
        print(f'Generated audio saved as {output_file_path}')
        print(f'Duration: {int(minutes)} minutes {int(seconds)} seconds')
        if(l==[]):
            l.append(minutes*60+  seconds)
        else:
            l.append(l[-1] + minutes*60+  seconds)

        count += 1  # Increment count for the next file
    else:
        print(f"File '{emotion_audio_files}' does not exist.")

def get_random_file_from_directory(directory):
    files = os.listdir(directory)
    files = [f for f in files if os.path.isfile(os.path.join(directory, f))]
    
    if not files:
        raise ValueError("No files found in the directory.")
    
    return os.path.join(directory, random.choice(files))





