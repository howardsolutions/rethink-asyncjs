function fakeAjax(url, cb) {
  var fake_responses = {
    file1: 'The first text',
    file2: 'The middle text',
    file3: 'The last text',
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

  console.log('Requesting: ' + url);

  setTimeout(function () {
    cb(fake_responses[url]);
  }, randomDelay);
}

function output(text) {
  console.log(text);
}

// **************************************

function getFile(file) {
  return new Promise((resolve, reject) => {
    fakeAjax(file, function (responseText) {
      resolve(responseText);
    });
    // 2 way of doing thing => fakeAjax(file, resolve);
  });
}

const p1 = getFile('file1');
const p2 = getFile('file2');
const p3 = getFile('file3');

// p1.then(function (responseText1) {
//   output(responseText1);

//   return p2;
// })
//   .then(function (responseText2) {
//     output(responseText2);
//     return p3;
//   })
//   .then(function (responseText3) {
//     output(responseText3);
//     output('COMPLETED!');
//   })
//   .catch(function (err) {
//     console.error(err);
//   });

// 2nd way
async function handleResponse() {
  try {
    let text1 = await p1;
    output(text1);

    let text2 = await p2;
    output(text2);

    let text3 = await p3;
    output(text3);

    output('Complete');
  } catch (err) {
    console.error(err);
  }
}

handleResponse();
