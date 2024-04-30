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

ASQ().runner(function* main() {
  let p1 = getFile('file1');
  let p2 = getFile('file2');
  let p3 = getFile('file3');

  let text1 = yield p1;
  output(text1);

  let text2 = yield p2;

  output(text2);

  let text3 = yield p3;
  output(text3);

  output('Completed');
});
