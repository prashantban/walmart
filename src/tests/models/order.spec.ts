import {expect} from 'chai';
import * as sinon from "sinon";
import {Orders} from "../../lib/models/orders";
import {Database} from "../../lib/data/database";
import {order} from "../../lib/types/order";


describe('Order Model Tests', () => {

    const orderModel = new Orders();
    const db = new Database();

    let sandbox : any = sinon.createSandbox();

    before(() => {
    });

    afterEach(() => {
        sandbox.restore();
    });

    context('Positive Tests', () => {

        it('should create an object of type Order', () => {
            expect(orderModel).to.be.an('object');
            expect(orderModel).to.be.an.instanceof(Orders);
        });

        it('should be able to getAllOrders', (done) => {
            sandbox.stub(db, "all").callsFake(() => {
                const arr = [{"id": 1}];
                return Promise.resolve(arr);
            });
            orderModel.getAllOrders()
                .then(rows => {
                    expect((rows as any).length).to.equal(1);
                    done();
                })
        });

        it('should be able to Update Order', (done) => {
            sandbox.stub(db, "get").callsFake(() => {
                const item = {
                    id: 12,
                    name : "Test Order"
                }
                return Promise.resolve(item);
            });
            orderModel.updateOrder('12', 'Test Order')
                .then(row => {
                    expect(row ).to.be.an('object');
                    expect((row as any).name ).to.equal('Test Order');
                    done();
                })
        });
    });

    context('Negetive Tests', () => {
        db.openDb('test.db');
        sandbox.stub(Database.db, "get").callsFake(() => {
            throw "err";
        });
        it('should fail to Update Order', (done) => {
            orderModel.updateOrder('12', 'Test Item')
                .then(row => row)
                .catch(err => {
                    expect(err).to.be.not.empty;
                    done();
                })
        });

        it('should fail to Create New Order', (done) => {
            sandbox.stub(db, "run").callsFake(() => {
                return Promise.resolve({id : 21});
            });
            sandbox.stub(Database.db, "exec").callsFake(() => {
                throw "err";
            });
            const order : order = {
                user_id : 1,
                items : [{id : 1, name : "Test"}]
            };
            orderModel.createNewOrder(order )
                .then(row => row)
                .catch(err => {
                    expect(err).to.be.not.empty;
                    done();
                })
        });
    })
});
