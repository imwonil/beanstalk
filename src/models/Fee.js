const UserStorage = require( "./UserStorage")

class Fee {

constructor(fee) {
this.fee = fee

}

async fees(){
const fee = this.fee

const c = await UserStorage.days(fee)
return c
}


}
module.exports = Fee;

