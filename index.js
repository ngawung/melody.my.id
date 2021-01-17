const fs = require('fs');
const write = require('write');

const less = require("less");
const CleanCSS = require('clean-css');

try {  
    // read main less file
    var lessData = fs.readFileSync('./less/main.less', 'utf8');
    
    // compile less
    less.render(lessData.toString(), { filename: 'testing.css' })
    .then(function(output) {
        
        const final_output = new CleanCSS().minify(output.css);
        
        console.log("==================================")
        console.log(`Error: ${final_output.errors}`);
        console.log(`Warn: ${final_output.warnings}`);
        console.log(`Original Size: ${final_output.stats.originalSize}kb`);
        console.log(`Minify Size: ${final_output.stats.minifiedSize}kb`)
        console.log(`Time Spent: ${final_output.stats.timeSpent}ms`);
        console.log(`Efficiency: ${final_output.stats.efficiency.toFixed(2)}`);
        console.log("==================================")
        
        write.sync('static/css/melody.css', final_output.styles, { overwrite: true });
        
    },
    function(error) {
        console.log(error);
    });
    
} catch(e) {
    console.log('Error:', e.stack);
}