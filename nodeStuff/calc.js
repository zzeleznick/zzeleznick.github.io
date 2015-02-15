// for a given command line the form holds:
// [ node ] [ program.js] [input 1] ...

/*
var input = process.argv[2];
var result = 1;
for (var i = 1; i <= input; i++) {
    result *= i;
};
console.log(result);
*/
//on argv first is node, second is file name
//note spaces are not included by default as argv -- node splits the prompt with a .split(' ') analogue

// HMMM * --> all files
//console.log(process.argv);
var ops_map = [];
/* Splice changes the object by ejecting it!! */
var data = process.argv;
data = data.splice(2,data.length);
var ops_count = Math.floor(data.length / 2);
//console.log('Operations : ' + ops_count);
//console.log(process.argv);
//console.log(data);
if (data.length < 1) {
    console.log('ERROR: Nothing to do');
    return;
} else if ((data.length) % 2 == 0) {
    console.log('ERROR: Unbalanced terms');
    return
} //
else {
    var result = 0; //data[2];
    var temp = 0;
    var counter = 0; // counter for ops_count
    var i = 0;  // index
    var last_char = 'x';
    while (counter < ops_count) {
        //if (data[i+1] != data[i+3])  {
            if (data[i+1] == '.') {
                data[i] = data[i] * data[i+2];
                data = data.splice(0,1).concat(data.splice(2,data.length));  //note the splice removes and the object is removed
                //console.log(data);
            }
            else if (data[i+1] == '/') {
                data[i] = (data[i]) / (data[i+2]);
                data = data.splice(0,1).concat(data.splice(2,data.length));
                //console.log(data);
            }
            else if (data[i+3] == '.') {
                data[i+2] = data[i+2] * data[i+4];
                data = data.splice(0,3).concat(data.splice(2,data.length));
                //console.log(data);
            }
            else if (data[i+3] == '/') {
                data[i+2] = data[i+2] / data[i+4];
                data = data.splice(0,3).concat(data.splice(2,data.length));
                //console.log(data);
            }
            else if (data[i+1] == '-') {
                data[i] = (data[i]) - (data[i+2]);
                data = data.splice(0,1).concat(data.splice(2,data.length));
                //console.log(data);
            }
            else if (data[i+1] == '+') {
                data[i] = parseFloat(data[i]) + parseFloat(data[i+2]);
                data = data.splice(0,1).concat(data.splice(2,data.length));
                //console.log(data)
            }
            else {console.log('Uncaught ERROR: ' + data); return;}
       // }
        counter++;
    }
    console.log('Answer: '+ data);
    //console.log(result);
}
