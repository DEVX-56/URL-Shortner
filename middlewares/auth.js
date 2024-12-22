const { getUser } = require("../service/auth");

function cheackForAuthentication(req, res, next) {
  const tokenCookie = req.cookies?.token;
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);

  req.user = user;
  return next();
}

//any roles
function restrictTo(roles){
  return function(req, res, next){
    if(!req.user) return res.redirect("/login");
    if(!roles.include(req.user.roles)) return res.end('Unauthorized');
    return next();
  };
};

module.exports = {
  cheackForAuthentication,
  restrictTo,
};
