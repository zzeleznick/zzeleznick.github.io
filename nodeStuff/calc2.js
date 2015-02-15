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

var ops_count = 0;
var ops_array = []; // 1 corresponds to mult, 2 to divide
var skipped = [];
var sub_result = 0;
var data = process.argv;
//console.log(process.argv);
if (process.argv.length < 3) {
    console.log('ERROR: Nothing to do');
    return;
} else if ((process.argv.length - 3) % 2 == 1) {
    console.log('ERROR: Unbalanced terms');
    return
} //
else {
    var result = 0;//data[2];
    var flag = 0; // last was also a mult or div
    //if (process.argv.length == 3) { console.log('Answer: ' +  result); return;}  //
    for (i = 3; i < data.length - 1; i += 2) {
        if (flag) {
            if (data[i] == '.') {
                sub_result *= data[i+1];
            } else if (data[i] == '/') {
                sub_result /= data[i+1];
            }
            else if (data[i] == '+') {
                sub_result += parseInt(data[i+1]);
                console.log(result);
                result += parseInt(sub_result);
                console.log(result);
                flag = 0;
            }
             else if (data[i] == '-') {
                sub_result -= data[i+1];
                result += sub_result;
                flag = 0;
            }

        }
         else {
            if (data[i] == '.') {
                sub_result = (data[i-1] * data[i+1]);
                 // console.log(sub_result);
                flag = 1;
            } else if (data[i] == '/') {
                sub_result = (data[i - 1] / data[i+1]);
                flag = 1;
              }
            else if (data[i] == '+') {
                sub_result = (data[i - 1]  + data[i+1]);
                result += sub_result;
            }
            else if (data[i] == '-') {
                sub_result = (data[i - 1] - data[i+1]);
                 result += sub_result;
            }
        }

    }
    console.log(result);
    //result += sub_result;
    //console.log(result);
}


function multMe(val_1, val_2) {
    return val_1 * val_2;
}
