import nltk
from nltk.sentiment import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from collections import defaultdict

# Download necessary NLTK data files
nltk.download('vader_lexicon')
nltk.download('punkt')
nltk.download('stopwords')

def categorize_sentiment(score):
    if score >= 0.5:
        return 'happy'
    elif score >= 0.1:
        return 'neutral'
    elif score > -0.1:
        return 'sad'
    elif score <= -0.5:
        return 'angry'
    else:
        return 'fear'

def get_sentiment_words(text_list):
    # Initialize the sentiment analyzer
    sia = SentimentIntensityAnalyzer()
    
    # Initialize a dictionary to hold sentiment words
    sentiment_words = defaultdict(list)
    
    # Process each text in the list
    for text in text_list:
        # Tokenize and remove stop words
        words = word_tokenize(text)
        stop_words = set(stopwords.words('english'))
        filtered_words = [word.lower() for word in words if word.lower() not in stop_words and word.isalpha()]
        
        # Analyze sentiment for each word
        for word in filtered_words:
            sentiment_score = sia.polarity_scores(word)['compound']
            category = categorize_sentiment(sentiment_score)
            if sentiment_score != 0:
                sentiment_words[category].append(word)
    
    # Prepare the list to save sentiment words and their labels
    sentiment_list = []
    for category, words in sentiment_words.items():
        word_counts = nltk.FreqDist(words)
        sorted_words = sorted(word_counts.items(), key=lambda x: x[1], reverse=True)
        for word, freq in sorted_words:
            sentiment_list.append([word, category])
    
    # Print the sentiment words and their labels
    for item in sentiment_list:
        print(f"Sentiment Word: {item[0]}, Label: {item[1]}")
    
    return sentiment_list

# Example usage with a list of strings


# sentiment_words = get_sentiment_words(text_list)
# print(sentiment_words)
