const FS = require('fs');
const CSV = require('fast-csv');
const path = require('path');

let readStream = FS.createReadStream('ctc.csv', { encoding: 'utf8' });


let csvStream = CSV()
    .on("data", function(data){
        let filename = data[0].slice(0, -4);
        let file = path.resolve(__dirname, `../Click to Choose/ICE_Word_Docs/${filename}.docx`);
        FS.copyFileSync(file , `./ice/${filename}.docx`);
    })
    .on("end", function(){
        console.log("done");
    });

readStream.pipe(csvStream);
