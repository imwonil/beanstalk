const UserStorage = require( "./UserStorage")

class Benchs {

constructor(bench) {
this.bench = bench

}
async Add() {
  const add = this.bench;

  
  try{
  const a = await UserStorage.Addsavesk(add);
  }catch(err) {
    return {success: false, msg: err}

  }
  const a = await UserStorage.Addsavesk(add);
 
  return a;

}
async Acc() {
  
    const add = this.bench;
    
    const response = await UserStorage.days(add); //UserStorage 321
   
    return response
 
  
   
    

  
   
  }
 async goodskinds() {
    const add =this.bench;
    const goods= await UserStorage.goods(add)
     return goods
 }
 async setKind() {
  const add =this.bench;

  const goods= await UserStorage.adminSetKindSave(add)
  console.log(goods,48)
   return goods
}
async adminNext() {
  const  c =  this.bench
  const a = await UserStorage.adminnext(c) 
  return a
}
async modIfy() {
  const  c =  this.bench
  const a = await UserStorage.modify(c) 

  return a
}
async TimeSubAdd() {
  
  const  c =  this.bench
  const a = await UserStorage.timesubadd(c) 
 
  return a
}
async adimingoods() {
  
  const  c =  this.bench
  const a = await UserStorage.adminGoods(c) 
  
  return a;
  
}
async Userinfor() {
  
  const  c =  this.bench
  const a = await UserStorage.Userinfor(c) 
  return a
  
}
async Forcibley() {
  
  const  c =  this.bench
  const a = await UserStorage.forciBley(c) 
  return a
  
}
async getNext() {
  
  const  client =  this.bench
  const a = await UserStorage.getnext(client) 
  console.log(a)
  return a
  
}
async KoKo() {
  
  const  client =  this.bench
  const a = await UserStorage.KOKO(client) 
 
  return a
  
}
async Nice() {
  
  const  client =  this.bench
  const a = await UserStorage.NIce(client) 
 
  return a
  
}
async SEARCH() {
  
  const  client =  this.bench
  const a = await UserStorage.SEarch(client) 
   console.log(a)
  return a
  
}

async changseat() {
  
  const  client =  this.bench
  const a = await UserStorage.changSEAT(client) 
   console.log(a)
  return a
  
}
}
module.exports = Benchs;

