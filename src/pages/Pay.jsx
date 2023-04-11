import React, { useEffect, useState } from 'react'
import { API_URL } from '../config'
import { isAuthenticated } from '../utils/helpers'
import DropIn from "braintree-web-drop-in-react";
import { createOrder } from '../services/orders';

const prods = [
  {
    _id: "63f55a00dad98c276c74f8c3",
    name: "CHAUSSURE OZNOVO GRIS",
    price: 760,
    count: 4,
    quantity: 12
  }
];

const getBraintreeToken = (userId, token) => {
    return fetch(`${API_URL}/braintree/getToken/${userId}`,{
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res => res.json())
}

const paymentProcess = (userId, token, paymentData) => {
    return fetch(`${API_URL}/braintree/purchase/${userId}`,{
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(paymentData)
    })
    .then(res => res.json())
}

const Pay = () => {

    const [data, setData] = useState({
        braintreeToken:null,
        error:null,
        instance: {}
    });
    const [amount, setAmount] = useState(0);
    const [products, setProducts] = useState("");
    const [address, setAddress] = useState("");

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().user.token;

    useEffect(() => {

        getBraintreeToken(userId, token)
            .then(response => setData({...data, braintreeToken: response.token}))
            .catch(error => {
                setData({...data, error})
            })
    },[])

    const setTotalPrice = () => {
      let total = 0;
      prods.map(prod => {
        total = prod.count * prod.price
      });

      return total
    }

    const buy = () => {
      data.instance
        ?.requestPaymentMethod()
        .then(data => {
            paymentProcess(userId, token, {
                amount: setTotalPrice(),
                paymentMethodNonce: data.nonce,
                products: prods
            }).then(res => {

                const orderData = {
                    products: prods,
                    transaction_id: res.transaction.id,
                    totalPrice: res.transaction.amount,
                    address
                }

                createOrder(userId,orderData)
                .then(res => console.log('res', res))
                .catch(err => console.log('err', err))

            })
            .catch(err => console.log('err payment', err))
        })
        .catch(err => {
          console.log("err", err);
        });
    };

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="amount"
          onChange={e => setAmount(e.target.value)}
        />
        <textarea
          onChange={e => {
            setProducts(e.target.value.split(","));
          }}
          placeholder="products"
        />
        <textarea
          onChange={e => {
            setAddress(e.target.value);
          }}
          placeholder="address"
        />
      </div>
      {data.braintreeToken ? (
        <DropIn
          options={{
            authorization: data.braintreeToken,
            paypal: {
              flow: "vault",
            },
          }}
          onInstance={instance => (data.instance = instance)}
        />
      ) : null}
      <button onClick={buy}>checkout</button>
    </div>
  );
}

export default Pay