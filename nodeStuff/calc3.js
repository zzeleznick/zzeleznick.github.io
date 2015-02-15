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
var break_pts = [];
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
    var result = 0; //data[2];
    var flag = 0; // last was also a mult or div
    var j = 0; // j = i - 3
    for (var i = 3; i < data.length - 1; i += 2) {
        if (data[i] == '+' || data[i] == '-') {
            break_pts[j] = i;
            j++;
        }
    }
    console.log(break_pts);

    for (var outer = 0; outer < break_pts.length; outer++) {
        sub_result = null;
        for (var k = 2; k < break_pts[outer]; k += 2) {
            if (data[k + 1] == '.') {
                if (!sub_result) {
                    sub_result = (data[k] * data[k + 2]);
                    console.log(sub_result);
                } else {
                    sub_result *= data[k + 2];
                }

            } else if (data[k + 1] == '/') {
                if (!sub_result) {
                    sub_result = (data[k] / data[k + 2]);
                } else {
                    sub_result /= data[k + 2];
                }
            } else if (data[k + 1] == '+') {
                sub_result = (data[k] + data[k + 2]);
                result += sub_result;
            } else if (data[k + 1] == '-') {
                sub_result = (data[k] - data[k + 2]);
                result += sub_result;
            }
        }
        result += sub_result;
        //console.log(result);
        //result += sub_result;
        //console.log(result);
    }
    for (var rem = break_pts[break_pts.length - 1] + 1; outer < data.length; rem += 2) {
        if (data[rem] == '+') {
            result += data[rem + 1];
        } else if (data[rem] == '-') {
            result -= (data[rem + 1]);
        }
        console.log(result);
    }
}
