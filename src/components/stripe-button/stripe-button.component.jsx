import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const onToken = token => {
    console.log(token);
    alert('Payment Successful');
}

const StripeCheckoutButton = ({ price}) => {
    const priceForStripe = price * 100;
    const publishableKey ='pk_test_EjmnsJ1AsybYrH1YK5wlni3C00S66ADn7z';

    return (
        <StripeCheckout 
        label='Pay Now' 
        name='CRWN Clothing Ltd.'
        billingAddress
        shippingAddress
        image='https://svgshare.com/i/CUz.svg'
        description={`Your total is $${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishableKey}
        />
    );

};

export default StripeCheckoutButton;