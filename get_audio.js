const https = require('https');

const queries = [
  'ambient spa meditation',
  'singing bowl frequency', 
  'deep healing sleep',
  'tibetan bowl',
  'ethereal ambient drone'
];

async function search() {
  for (const q of queries) {
    const url = `https://pixabay.com/api/audio/?key=demo&q=${encodeURIComponent(q)}&page=1&per_page=5`;
    console.log(`\nSearching: ${q}`);
    
    await new Promise((resolve) => {
      https.get(url, {
        headers: { 'User-Agent': 'Mozilla/5.0' }
      }, (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.hits) {
              parsed.hits.forEach(h => {
                const duration = Math.floor(h.duration / 60) + ':' + Math.floor(h.duration % 60).toString().padStart(2, '0');
                console.log(`- ${h.name} (${duration})`);
                console.log(`  URL: ${h.audio_download}`);
              });
            }
          } catch(e) {}
          resolve();
        });
      });
    });
  }
}

search();
