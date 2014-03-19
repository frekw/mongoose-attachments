var gm = require('gm').subClass({ imageMagick: true });
var fs = require('fs');


var transform = function(src, dest, args, cb){
  console.log('Transform', src, ' -> ', dest, ' using: ', args.join(' '));
  var proc = gm(src)
            .command('convert');
  proc.out.apply(proc, args)
  .write(dest, cb);
};

var command = function(args, cb){
  var proc = gm()
            .command('convert');
  proc.out.apply(proc, args)
  .toBuffer(function(err, buf){
    if(err) return cb(err);
    return cb(null, buf.toString());
  });
};

module.exports = {
  convert: function(args, cb){
    if(args.length < 1) return  cb(new Error('Invalid arguments provided to convert'));
    if(args[0].charAt(0) === '-') {
      command(args, cb);
    } else {
      var src = args.shift();
      var dest = args.pop();
      transform(src, dest, args, cb);
    }

  },
  identify: function(path, cb){
    gm(path).identify(cb);
  }
};

