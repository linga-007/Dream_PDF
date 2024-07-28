import os
from pydub import AudioSegment
from model import audio_generation

# texts_and_sentiments = {
#     "Hello world": "happy",
#     "This is a test": "sad",
#     "Goodbye and I am very sad now because of my marks I got": "angry",
#     "I am scared of lizards ": "fear",
#     "I just can't believe what happened today": "surprise",
#     "Everything is fine, nothing to worry about": "neutral",
#     "I'm so excited and thrilled about this event": "happy",
#     "I feel so down and demotivated": "sad",
#     "This is absolutely disgusting": "disgust",
#     "I can't wait for the party": "happy",
#     "I am worried about the upcoming exam": "fear",
#     "I am furious about the recent changes": "angry"
# }

l=[0] #for timestamp

def combining_audios(texts_and_sentiments, output_folder):
    generated_files = []
    for text, sentiment in texts_and_sentiments.items():
        generated_file , time = audio_generation(text, sentiment)
        if(l==[0]):
            l.append(time)
        else:
            l.append(l[-1]+time)
        generated_files.append(generated_file)
    print("time stamp:",l)
    final_audio(generated_files, output_folder)
    return l

def final_audio(audio_files, output_folder):
    
    # if not os.path.exists(output_folder):
    #     os.makedirs(output_folder)

    combined = AudioSegment.empty()
    for file in audio_files:
        audio = AudioSegment.from_file(file)
        combined += audio
    
    output_file = os.path.join(output_folder, "result.wav")
    combined.export(output_file, format='wav')

    # Remove temp files
    for file in audio_files:
        os.remove(file)

    print(f'Final audio saved as {output_file}')

output_folder = "generatedaudio"  #path

# combining_audios(texts_and_sentiments, output_folder)
