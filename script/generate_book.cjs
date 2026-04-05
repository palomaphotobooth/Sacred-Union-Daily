const fs = require('fs');
const path = require('path');

const dir = 'attached_assets/epub_extracted/OEBPS';
const files = fs.readdirSync(dir).filter(f => f.startsWith('chapter') && f.endsWith('.xhtml'));

let book = [];

for (const file of files.sort()) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const paragraphs = [];
  const matches = content.match(/<p.*?>(.*?)<\/p>/g);
  
  if (matches) {
    for (const match of matches) {
      const text = match.replace(/<\/?p.*?>/g, '').replace(/&quot;/g, '"').replace(/&#8217;/g, "'").replace(/<[^>]*>?/gm, '').trim();
      if (text.length > 0) {
        paragraphs.push(text);
      }
    }
  }
  
  if (paragraphs.length > 0) {
    // Attempt to extract title from the first short paragraph or just use "Chapter X"
    let title = `Chapter ${book.length + 1}`;
    book.push({
      id: book.length + 1,
      title: title,
      paragraphs: paragraphs
    });
  }
}

fs.writeFileSync('client/src/lib/book.json', JSON.stringify(book, null, 2));
console.log(`Generated book with ${book.length} chapters`);
