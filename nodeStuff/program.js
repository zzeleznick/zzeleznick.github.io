//console.log(process.argv);
///THIS DEMONSTRATES SUMMING INPUT ARGS in the form
///node program.js 1 2 3
///node program.js '11' '22' '3'
/* var sum = 0;
for (i = 2; i < process.argv.length; i++) {
    sum += Number(process.argv[i]);
};
console.log(sum); */

/* --- IO ----*/
//To perform a filesystem operation you are going to need the fs module from the Node core library. To load this kind of module,
//or any other "global" module, use the following incantation:
//    var fs = require('fs')

/*var fs = require('fs');
var buf = fs.readFileSync(process.argv[2]);
var str = buf.toString();
var split = str.split('\n');
var new_lines = 0;
for (i=0; i < split.length - 1; i++) {
    new_lines += 1;
};
console.log(new_lines);  */

/* ----- IO ASYNCH -------*/
/*Instead of fs.readFileSync() you will want to use fs.readFile()
and instead of using the return value of this method you need to collect
 the value from a callback function that you pass in as the second argument.
  To learn more about callbacks, check out:
  [https://github.com/maxogden/art-of-node#callbacks]
  (https://github.com/maxogden/art-of-node#callbacks). */
/*var fs = require('fs');

function myCallback(err, data) {
    if (err) {
        console.log('ERROR! ' + err);
    }
    var str = data.toString().split('\n').length - 1;
    console.log(str);
}
fs.readFile(process.argv[2], myCallback);  // process.arg values used for data

*/

/* ----- READ ASYNCH -------*/
/*var fs = require('fs');
var my_path = process.argv[2];
var my_ext = process.argv[3];
fs.readdir(my_path, myCallback); //my path is a directory (e.g. '/home')

function myCallback(err, file_list) {  // this passes in the read directory as a list
    if (err) {
        console.log('ERROR! ' + err);
    }
    var str = file_list.toString().split(",");
    for ( i=0; i < str.length; i++) {

        var temp = str[i].substring(str[i].length - my_ext.length);  //no period in search delimiter
        if (str[i].charAt(str[i].length - my_ext.length - 1)  != '.') {continue;}
        //console.log('Failed at ' + str[i]);
        else if (temp == my_ext) {
              console.log(str[i]);
        }
    }
}
///ALTERNATE SOLUTION
   var fs = require('fs')
    var path = require('path')

    fs.readdir(process.argv[2], function (err, list) {
      list.forEach(function (file) {
        if (path.extname(file) === '.' + process.argv[3])
          console.log(file)
      })
    })

*/

///END OF PT 4
/*
 » To print these instructions again, run: learnyounode print
 » To execute your program in a test environment, run: learnyounode run program.js
 » To verify your program, run: learnyounode verify program.js
 » For help run: learnyounode help
*/