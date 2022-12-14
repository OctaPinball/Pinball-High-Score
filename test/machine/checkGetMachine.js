var expect = require('chai').expect;
var getGetMachineMW = require('../../middleware/machines/getMachineMW');

describe('Get machine test:', function () {
    it('machine not found', function (done) {

        var req = {
            params: {
                machine_id: 123456789
            }
        }
        var res = {
            locals: {
                error: undefined
            }
        }

        var fakeMachineModel = {
          findOne: function (some, cb) {
            cb("machine not found", undefined)
          }
        };
    
        getGetMachineMW({
            MachineModel: fakeMachineModel
        })(req, res, function (err) {
          expect(err).to.eql("machine not found");
          done();
        });
      });

      it('machine found', function (done) {

        var req = {
            params: {
                machine_id: 123456789
            }
        }

        var res = {
                locals: {
                    machine: undefined
                }
        }

        var fakeMachineModel = {
          findOne: function (some, cb) {
            cb(undefined, machine = {
                _id: 123456789,
                name: "Twilight Zone",
                manufacturer: "Bally",
                year: 1993
        })
          }
        };
    
        getGetMachineMW({
            MachineModel: fakeMachineModel
        })(req, res, function (err) {
            expect(res.locals.machine).to.equals(machine);
          done();
        });
      });

});