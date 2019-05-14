module.exports.isPilot = isPilot = function(req, res, next) { 
    if(req.user.role == 0)
        next();
    else
        res.status(403).send("Forbiden");
  };

module.exports.isAdmin = isAdmin = function(req, res, next) { 
    if(req.user.role == 1)
        next();
    else
        res.status(403).send("Forbiden");
  };