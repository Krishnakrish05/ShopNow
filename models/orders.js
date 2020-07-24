import  moment from "moment"

class Order{
    constructor(id,items,totalAmount,date){
        this.id=id
        this.items=items
        this.totalAmount=totalAmount
        this.date=date
    }

    get readableDate(){
      //   return this.date.toLocaleDateString('en-EN',{
      //       year:'numeric',
      //       month:"numeric",
      //       day:"numeric",
      //       hour:"2 -digit",
      //       minute:"2 -digit" 
      //  })
       return moment(this.date).format("MMMM Do YYYY,hh:mm")
       
      // return this.date.moment().format('MMMM Do YYYY, h:mm:ss a');
    }
}
  // moment(this.date).format('MMMM Do YYYY, h:mm:ss a');




export default Order