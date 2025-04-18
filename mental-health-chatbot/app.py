from flask import Flask, render_template, jsonify, request
from dotenv import load_dotenv
import os
import random
from datetime import datetime
import requests

# Load environment variables
load_dotenv()

app = Flask(__name__)

# Sample data for prayers (you can replace this with a database)
prayer_data = {
    'completed': 85,
    'missed': 15
}

# Route for the main page
@app.route('/')
def index():
    return render_template('index.html')

# API endpoint for prayer statistics
@app.route('/api/prayer-stats')
def prayer_stats():
    return jsonify(prayer_data)

# API endpoint for daily Quran verse
@app.route('/api/daily-verse')
def daily_verse():
    try:
        # Using the Quran API to get a random verse
        surah = random.randint(1, 114)
        response = requests.get(f'http://api.alquran.cloud/v1/surah/{surah}')
        data = response.json()
        
        if data['status'] == 'OK':
            verse_number = random.randint(0, len(data['data']['ayahs']) - 1)
            verse = data['data']['ayahs'][verse_number]
            return jsonify({
                'status': 'success',
                'verse': verse['text'],
                'surah': data['data']['name'],
                'verse_number': verse['numberInSurah']
            })
    except Exception as e:
        pass
    
    # Fallback verse if API fails
    return jsonify({
        'status': 'success',
        'verse': 'Indeed, with hardship comes ease.',
        'surah': 'Al-Inshirah',
        'verse_number': 6
    })

if __name__ == '__main__':
    app.run(debug=True) 