const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
    const files = [
        './dist/podnoms-player/runtime-es2015.js',
        './dist/podnoms-player/polyfills-es2015.js',
        './dist/podnoms-player/scripts.js',
        './dist/podnoms-player/main-es2015.js',
    ];

    await fs.ensureDir('elements');
    await concat(files, 'elements/podnoms-player.js');
    if (fs.existsSync('docs/index.js')) {
        fs.unlinkSync('docs/index.js');
    }
    fs.copyFileSync('elements/podnoms-player.js', 'docs/player.js');
})();
