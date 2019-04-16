import {expect} from 'chai';
import * as sinon from "sinon";
import {Database} from "../../lib/data/database";
import {Users} from "../../lib/models/users";


describe('Order Model Tests', () => {

    const userModel = new Users();
    const db = new Database();

    let sandbox : any = sinon.createSandbox();

    before(() => {
    });

    afterEach(() => {
        sandbox.restore();
    });

    context('Positive Tests', () => {

        it('should create an object of type User', () => {
            expect(userModel).to.be.an('object');
            expect(userModel).to.be.an.instanceof(Users);
        });

        it('should be able to getAllUsers', (done) => {
            sandbox.stub(db, "all").callsFake(() => {
                const arr = [{"id": 1}];
                return Promise.resolve(arr);
            });
            userModel.getAllUsers()
                .then(rows => {
                    expect((rows as any).length).to.equal(1);
                    done();
                })
        });

        it('should be able to Update User', (done) => {
            sandbox.stub(db, "get").callsFake(() => {
                const item = {
                    id: 12,
                    name : "Test User"
                }
                return Promise.resolve(item);
            });
            userModel.updateUser('12', 'Test User')
                .then(row => {
                    expect(row ).to.be.an('object');
                    expect((row as any).name ).to.equal('Test User');
                    done();
                })
        });
    });
});
