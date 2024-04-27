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
  return ASQ(function (done) {
    fakeAjax(file, done);
  });
}

let s1 = getFile('file1');
let s2 = getFile('file2');
let s3 = getFile('file3');

s1.val(output)
  .seq(s2)
  .val(output)
  .seq(s3)
  .val(output)
  .val(function () {
    output('Complete');
  });
