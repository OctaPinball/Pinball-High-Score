var expect = require('chai').expect;
var getloginMW = require('../../middleware/auth/loginMW');

describe('User login test:', function () {
    it('not enough input', function (done) {

        var req = {
            body: {
                login_username: undefined,
                login_password: undefined
            }
        }
        var res = {
            locals: {
                error: undefined
            }
        }

        var fakeUserModel = {
          findOne: function (some, cb) {
            cb(undefined, undefined)
          }
        };
    
        getloginMW({
            PlayerModel: fakeUserModel
        })(req, res, function (err) {
          expect(res.locals.error).to.eql('Not enough input!')
          done();
        });
      });
    
      it('user not found', function (done) {

        var req = {
            body: {
                login_username: "user",
                login_password: "pass"
            }
        }
        var res = {
            locals: {
                error: undefined
            }
        }

        var fakeUserModel = {
          findOne: function (some, cb) {
            cb("user not found", undefined)
          }
        };
    
        getloginMW({
            PlayerModel: fakeUserModel
        })(req, res, function (err) {
          expect(err).to.eql("user not found");
          expect(res.locals.error).to.eql('This username does not exist!')
          done();
        });
      });




      it('password not match', function (done) {

        var req = {
            body: {
                login_username: "user",
                login_password: "pass"
            }
        }
        var res = {
            locals: []
        }

        var fakeUserModel = {
          findOne: function (some, cb) {
            cb(undefined, result = {password: "nemjojelszo"})
          }
        };
    
        getloginMW({
            PlayerModel: fakeUserModel
        })(req, res, function (err) {
          expect(res.locals.error).to.eql('Wrong password!')
          done();
        });
      });

      it('password match with admin role', function (done) {

        var req = {
            body: {
                login_username: "user",
                login_password: "pass"
            },
            session: {
                adminid: undefined,
                userid: undefined
            }
        }

        var res = {
            redirect: function (to) {
                expect(req.session.adminid).to.equal(result._id)
                expect(req.session.userid).to.equal(undefined)
                expect(to).to.eql('/competition');
              done();
            }
          };

        var fakeUserModel = {
          findOne: function (some, cb) {
            cb(undefined, result = {
                _id: 123456789,
                password: "pass",
                admin_role: true
        })
          }
        };
    
        getloginMW({
            PlayerModel: fakeUserModel
        })(req, res, function (err) {
            expect(true).to.eql(false);
          done();
        });
      });

      it('password match without admin role', function (done) {

        var req = {
            body: {
                login_username: "user",
                login_password: "pass"
            },
            session: {
                adminid: undefined,
                userid: undefined
            }
        }

        var res = {
            redirect: function (to) {
                expect(req.session.userid).to.equal(result._id)
                expect(req.session.adminid).to.equal(undefined)
                expect(to).to.eql('/competition');
                done();
              }
        }

        var fakeUserModel = {
          findOne: function (some, cb) {
            cb(undefined, result = {
                _id: 123456789,
                password: "pass",
                admin_role: false
        })
          }
        };
    
        getloginMW({
            PlayerModel: fakeUserModel
        })(req, res, function (err) {
            expect(true).to.eql(false);
          done();
        });
      });

    });
