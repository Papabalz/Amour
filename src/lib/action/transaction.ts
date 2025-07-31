

export const makePayment = async (request: Request) => {

    const formData = await request.formData();
   const email = formData.get('email') as string;
   const amount = formData.get('amount') as string;
   const currency = formData.get('currency') as string;
   const paymentMethod = formData.get('paymentMethod') as string;
   const transactionId = formData.get('transactionId') as string;
   const reference = formData.get('reference') as string;
   const bookingId = formData.get('bookingId') as string;




}




export const verifyPayment = async () => {

}

