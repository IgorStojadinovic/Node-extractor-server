import yake
import sys
import json
import nltk
import sys
nltk.download('stopwords')
nltk.download('punkt')

# Read input data from Node.js
input_data = sys.stdin.read()
parsed_data = json.loads(input_data)

kw_extractor = yake.KeywordExtractor()
language = "en"
max_ngram_size = 5
deduplication_threshold = 0.9
numOfKeywords = 10
custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, top=numOfKeywords, features=None)
phrasesOutput = custom_kw_extractor.extract_keywords(parsed_data)
phrases = [phrase[0] for phrase in phrasesOutput ]

print(json.dumps(phrases))