(function() {
  var SimpleAsync, fnRequest, fnTest, http, test, _;
  http = require("http");
  _ = require("underscore");
  SimpleAsync = require("../async");
  fnRequest = function(req, response) {
    var sa;
    sa = new SimpleAsync(test);
    return sa.run(function(err, res) {
      return response.end("DONE: " + (JSON.stringify(res)));
    });
  };
  fnTest = function(a, b, async) {
    var fn, res, time;
    res = a + b;
    time = Math.floor(Math.random() * 2000);
    fn = _.bind(async.callback, this, null, res);
    console.log("fnTest", async, time);
    setTimeout(time, fn);
  };
  test = {
    a: _.bind(fnTest, this, 1, 2),
    b: _.bind(fnTest, this, 1, 2)
  };
  http.createServer(fnRequest).listen(3001);
  console.log("Listen to 3001");
}).call(this);
