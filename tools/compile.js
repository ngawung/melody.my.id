const fs = require('fs');
const write = require('write');
const filesize = require("filesize");

const less = require("less");
const CleanCSS = require('clean-css');

// =================================
const MAINLESS = './less/main.less';
const OUTPUTCSS = 'static/generated/css/melody.css';
// =================================

module.exports = () => {
    try {  
        // read main less file
        var lessData = fs.readFileSync(MAINLESS, 'utf8');
        
        // compile less
        less.render(lessData.toString()).then(function(output) {
            
            const final_output = new CleanCSS({level: {1: {specialComments: 0}}}).minify(output.css);
            
            console.log("==================================")
            console.log(`Error: ${final_output.errors}`);
            console.log(`Warn: ${final_output.warnings}`);
            console.log(`Original Size: ${filesize(final_output.stats.originalSize)}`);
            console.log(`Minify Size: ${filesize(final_output.stats.minifiedSize)}`)
            console.log(`Time Spent: ${final_output.stats.timeSpent}ms`);
            console.log(`Efficiency: ${final_output.stats.efficiency.toFixed(2)}`);
            console.log("==================================")
            
            write.sync(OUTPUTCSS, final_output.styles, { overwrite: true });
            
        },
        function(error) {
            console.log(error);
        });
        
    } catch(e) {
        console.log('Error:', e.stack);
    }   
}