
function generateId (context,event, done) {
  let id = Math.floor(Math.random() * Math.floor(1000000));
  context.vars.id = id;
  return done();
}

module.exports.generateId = generateId