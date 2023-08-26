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
max_ngram_size = 1
deduplication_threshold = 0.4
numOfKeywords = 10
custom_kw_extractor = yake.KeywordExtractor(lan=language, n=max_ngram_size, dedupLim=deduplication_threshold, top=numOfKeywords, features=None)
keywordsOutput = custom_kw_extractor.extract_keywords(parsed_data)
keywrods = [keyword[0] for keyword in keywordsOutput ]

print(json.dumps(keywrods))
