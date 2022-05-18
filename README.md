# Intro

## Welcome to hi.health technical stage!

I hope you are as excited as we are, because we are very much looking forward to it!

In the following 30 to 45 minutes, we will spend some time together to build on top of an existing service and implement some features that will make our product better.

## Description

We handle payments. It's as simple as that!

In order to do that, we use [Stripe](https://stripe.com/en-gb-at) as our payment service provider.

Our Service is already capable of creating a payment, but this feature is incomplete.

Currently, with the help of the `POST /paymentIntents` method, we are able to create a pre-authorization on a user's card.

To complete the payment process, we need a way to charge the amount that was pre-authorized.

This is where you come into play. We need your expertise to help us finish the payment feature.

Please read through the tasks below and try to implement them to the best of your capabilities.

We are here to help clear out any questions you may have, so feel free to ask us anything during the interview. We appreciate if you could think out loud while you code so that we can better understand your thought process.

We hope you will have fun!

# Tasks

## Part 1

1. Implement a new endpoint that will allow capturing the full amount of a pre-authorized payment intent
   - you can use [Stripe API doc](https://stripe.com/docs/api/payment_intents) for reference
2. Implement error handling in case of:
   - a non-existent payment intent and return a status code of 400
   - a payment intent that is not waiting to be captured and notify an external system about this (console.log is sufficient) 

## Part 2

1. Extend the newly crated endpoint to support parametrization of the amount to capture
2. When successfully creating a payment intent, record the `paymentIntentId` in the database (local storage) with a status of `AUTHORIZED`
   - for our convenience, the db is implemented as a local module
   - add a new method that allows saving a new record to the local storage (in memory)
   - extend the current `Payment` interface to have some pre-defined statuses
3. When successfully capturing the payment intent, update the record in the local database to change the status to `CAPTURED`

# Technical details

- create a `.env` file and defined `STRIPE_API_KEY` with the value provided during the interview
- to create a payment intent, you can issue the following REST call from your favorite client:

```
POST http://localhost:3000/paymentIntents
body: {
    "amount": 1000,
    "merchantId": "1",
    "paymentId": "39442078-8d2b-4a24-be78-06c9927dc73d",
    "paymentMethodTypes": ["CARD"]
}
headers:
{
    hi-user-id: 540a02e8-39c2-4278-88dc-469399cbb54e
}
```
