function postData(input) {
    $.ajax({
        type: 'POST',
        url: 'multiply.py',
        data: { param: input },
        success: callbackFunc
    });
}

function callbackFunc(response) {
    console.log(response);
}

postData('data to process');

// $.ajax({
//   type: "POST",
//   url: "multiply.py",
//   data: { param: 'aa'}
// }).done(function( o ) {
//    console.log(o)
// });