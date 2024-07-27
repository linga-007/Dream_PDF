import os
import sys
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from main import extract_text
from Audio.toranto.aud import generate_audio

app = Flask(__name__, static_folder='E:/Dream_PDF/Backend/Generated_Audio')
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

file_name = ''

combined_sentences = {}

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory(app.static_folder, filename)

# File access, save, and process
@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'message': 'No file part'}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({'message': 'No selected file'}), 400
    
    if file:
        labeled_sentences = {}
        file_name = file.filename
        print("file name is ", file_name)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)

        file.save(filepath)
        print("saved")

        extracted_text = extract_text(file_name, labeled_sentences)
        print(extracted_text)

        labeled_sentences = extracted_text["labeled_sentences"]

        # Initialize a dictionary to store unique sentences by their label
        unique_sentences = {}

        for sentence, label in labeled_sentences.items():
            if label not in unique_sentences:
                unique_sentences[label] = []
            if sentence not in unique_sentences[label]:
                unique_sentences[label].append(sentence)

        # Combine sentences by label
        combined_sentences = {}
        for label, sentences in unique_sentences.items():
            combined_text = " ".join(sentences)  # Join sentences into a single string
            combined_sentences[combined_text] = label

        print("finally the combined text is ", combined_sentences)

        # Generate audio and get timestamps
        time_stamp = generate_audio(combined_sentences, file_name)
        
        if time_stamp is None:
            time_stamp = []  # Ensure time_stamp is an empty list if None
        
        # Update combined_sentences with timestamps
        result = []
        for text, label in combined_sentences.items():
            timestamp = time_stamp.pop(0) if time_stamp else 0
            result.append({"text": text, "label": label, "timestamp": timestamp})
        
        return jsonify({'message': 'File uploaded successfully', 'file': result, "timeStamp": time_stamp}), 200


if __name__ == '__main__':
    app.run(debug=True, port=5000)
