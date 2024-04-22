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
// The old-n-busted callback way

function getFile(file) {
  fakeAjax(file, function (text) {
    handleResponse(file, text);
  });
}

var responses = {};

var fileNames = ['file1', 'file2', 'file3'];

function handleResponse(filename, contents) {
  // if the fileName is not in the responses yet
  if (!(filename in responses)) {
    responses[filename] = contents;
  }

  for (let i = 0; i < fileNames.length; i++) {
    if (fileNames[i] in responses) {
      if (typeof responses[fileNames[i]] === 'string') {
        output(responses[fileNames[i]]);
        responses[fileNames[i]] = false;
      }
    } else {
      return;
    }
  }

  output('Complete');
}

// request all files at once in "parallel"
getFile('file1');
getFile('file2');
getFile('file3');
