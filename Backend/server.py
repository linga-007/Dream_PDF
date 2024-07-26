from flask import Flask, request, jsonify
from flask_cors import CORS
import os

from main import extract_text

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

        combined_sentences = {}
        sentences = []
        labels = []

        for i in labeled_sentences:
            sentences.append(i)
            labels.append(labeled_sentences[i])
        
        temp = [sentences[0]]
        current_label = labels[0]
        for i in range(1, len(sentences)):
            if labels[i] == current_label:
                temp.append(sentences[i])
            else:
                combined_sentences[tuple(temp)] = current_label
                temp = [sentences[i]]
                current_label = labels[i]
        # Add the last combined sentences
        combined_sentences[tuple(temp)] = current_label

        print("finally the combined text is ", combined_sentences)

        return jsonify({'message': 'File uploaded successfully', 'file': extracted_text["text"]}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
