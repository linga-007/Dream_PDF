import fitz
import re
import nltk
from langchain.text_splitter import RecursiveCharacterTextSplitter
import numpy as np
# nltk.download('punkt')
# nltk.download('stopwords')

import torch
from transformers import BertForSequenceClassification, BertTokenizer



def extract_text(file_name,labeled_sentences):
    s = ''  
    file_path = f'./uploads/{file_name}'
    doc = fitz.open(file_path)
    page_content = []  

    # Text extraction
    for page in doc:
        text = page.get_text()
        # Clean the text
        cleaned_text = re.sub(r'\uf0b7|\n', ' ', text)
        cleaned_text = re.sub(r'[^\w\s.,!?;:]', '', cleaned_text)  
        cleaned_text = re.sub(r'\s+', ' ', cleaned_text)
        page_content.append(cleaned_text.strip())
        s += cleaned_text.strip() + " "
    print("content is ", s)
    print("string is ", s)

    splitter = RecursiveCharacterTextSplitter(
        separators=['.', '\n'],
        chunk_size=250,
        chunk_overlap=0
    )

    chunks = splitter.split_text(s)
    q = []
    for i in chunks:
        i = i.lstrip('.')
        i = i + '.'
        q.append(i)
        tokenization_prediction(i,labeled_sentences)
    print("size is", len(page_content))

    # Save sentences to a file (if needed)
    # with open('sentences.txt', 'w') as f:
    #     for i in q:
    #         f.write(i)
    #         f.write('\n')

    return {"text" : s,  "labeled_sentences" : labeled_sentences}

def tokenization_prediction(text , labeled_sentences):

    token_path = "./Tokenizer"
    tokenizer = BertTokenizer.from_pretrained(token_path)

    model_folder = './Model'
    model_path = './Model/Model.pt'

    model = BertForSequenceClassification.from_pretrained(model_folder)
    model.load_state_dict(torch.load(model_path,map_location=torch.device('cpu')))

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model.to(device)

    
    MAX_LEN = 128
    encoding = tokenizer.encode_plus(
        text,
        add_special_tokens=True,
        max_length=MAX_LEN,
        truncation=True,
        padding='max_length',
        return_tensors='pt'
    )

    input_ids = tokenizer.encode(text, add_special_tokens=True,truncation=True,padding=True)

    attention_masks = [float(i>0) for i in input_ids]

    # Convert attention_masks to a tensor and move to device
    attention_masks = torch.tensor(attention_masks).unsqueeze(0).to(device)
    input_ids = torch.tensor(input_ids).unsqueeze(0).to(device) # Convert input_ids to tensor

    # Make prediction
    model.eval()
    with torch.no_grad():
    # Forward pass, calculate logit predictions
      logits = model(input_ids, token_type_ids=None, attention_mask=attention_masks)

    logits = logits[0].to('cpu').numpy()
    # Removed the following two lines as they were causing the error
    # label_ids = b_labels.to('cpu').numpy()
    # labels_flat = label_ids.flatten()

    pred_flat = np.argmax(logits, axis=1).flatten()
    # Removed df_metrics as it is not needed for prediction
    # df_metrics=pd.DataFrame({'Epoch':epochs,'Actual_class':labels_flat,'Predicted_class':pred_flat})

    prediced_label = get_sentiment_label(pred_flat[0])
    print("predicted sentiment is ",prediced_label)
    labeled_sentences[text] = prediced_label

# def get_sentiment(inputs):
#     model_folder = './Model'
#     model_path = './Model/Model.pt'

#     model = BertForSequenceClassification.from_pretrained(model_folder)

#     model.load_state_dict(torch.load(model_path,map_location=torch.device('cpu')))
#     model.eval()

#     text = "This is an example text."
#     # inputs = tokenizer(text, return_tensors="pt")
#     outputs = model(**inputs)
#     labels = ['negative', 'neutral', 'positive']
#     predicted_class = torch.argmax(outputs.logits, dim=1).item()
#     predicted_label = labels[predicted_class]
#     print(outputs)
#     print("label is ",predicted_label)
#     final_sentiment = get_sentiment_label(predicted_label)
#     print("predicted sentiment is ",final_sentiment)


def get_sentiment_label(predicted_label):
    label_mapping = {
        4:"sadness",
        2:"joy",
        0:"anger",
        1:"fear",
        5:"surprise",
        3:"love"
}
    print(label_mapping.get(predicted_label))
    return label_mapping.get(predicted_label, "Unknown")

# Test the prediction function with a sample input



