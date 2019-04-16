import {expect} from 'chai';
import * as sinon from "sinon";
import {Items} from "../../lib/models/items";
import {Database} from "../../lib/data/database";


describe('Item Model Tests', () => {

    const itemModel = new Items();
    const db = new Database();

    let sandbox : any = sinon.createSandbox();

    before(() => {
    });

    afterEach(() => {
        sandbox.restore();
    });

    context('Positive Tests', () => {

        it('should create an object of type Item', () => {
            expect(itemModel).to.be.an('object');
            expect(itemModel).to.be.an.instanceof(Items);
        });

        it('should be able to getAllItemsByOrder', (done) => {
            sandbox.stub(db, "all").callsFake(() => {
                const arr = [{"id": 1}];
                return Promise.resolve(arr);
            });
            itemModel.getAllItemsByOrder('12')
                .then(rows => {
                    expect((rows as any).length).to.equal(1);
                    done();
                })
        });

        it('should be able to Update Item', (done) => {
            sandbox.stub(db, "get").callsFake(() => {
                const item = {
                    id: 12,
                    name : "Test Item"
                }
                return Promise.resolve(item);
            });
            itemModel.updateItem('12', 'Test Item')
                .then(row => {
                    expect(row ).to.be.an('object');
                    expect((row as any).name ).to.equal('Test Item');
                    done();
                })
        });
    });

    context('Negetive Tests', () => {
        db.openDb('test.db');
        sandbox.stub(Database.db, "get").callsFake(() => {
            throw "err";
        });
        it('should fail to Update Item', (done) => {
            itemModel.updateItem('12', 'Test Item')
                .then(row => row)
                .catch(err => {
                    expect(err).to.be.not.empty;
                    done();
                })
        });
    })
});
