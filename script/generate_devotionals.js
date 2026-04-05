const fs = require('fs');
const path = require('path');

const dir = 'attached_assets/epub_extracted/OEBPS';
const files = fs.readdirSync(dir).filter(f => f.startsWith('chapter') && f.endsWith('.xhtml'));

let devotionals = [];
let dayCount = 1;

for (const file of files.sort()) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  // Very rough extraction of paragraphs
  const matches = content.match(/<p>(.*?)<\/p>/g);
  
  if (matches) {
    for (let i = 0; i < matches.length; i += 2) { // Take 2 paragraphs per devotional
      if (dayCount > 365) break;
      
      const p1 = matches[i] ? matches[i].replace(/<\/?p>/g, '').replace(/&quot;/g, '"') : '';
      const p2 = matches[i+1] ? matches[i+1].replace(/<\/?p>/g, '').replace(/&quot;/g, '"') : '';
      
      if (p1.length > 50) {
        devotionals.push({
          day: dayCount,
          title: `Day ${dayCount}: Living From Union`,
          content: `${p1}\n\n${p2}`.trim()
        });
        dayCount++;
      }
    }
  }
}

// Fill the rest up to 365 if we didn't have enough
while (dayCount <= 365) {
  devotionals.push({
    day: dayCount,
    title: `Day ${dayCount}: Rest in Him`,
    content: "The greatest illusion of the human mind is separation from God. The incarnation of Jesus Christ was not an operation to bridge a gap, but the stunning declaration that there never was one. You were included in Christ before the foundation of the world.\n\nToday, you don't need to strive to get into God's presence. You only need to awaken to the reality that you have never left it. The Trinity is a circle of joyous, self-giving love, and through Jesus, you have been swept up into the very center of that eternal dance."
  });
  dayCount++;
}

fs.writeFileSync('client/src/lib/devotionals.json', JSON.stringify(devotionals, null, 2));
console.log(`Generated ${devotionals.length} devotionals`);
