# Paddle Payment Integration Setup Guide

This guide explains how to configure Paddle for processing premium subscription payments in the Vocabulary Builder app.

## Overview

The app uses Paddle Billing for:
- Processing $5 one-time payments for ad-free premium subscriptions
- Managing customer billing portal (for subscription management)
- Handling payment webhooks to update user subscription status

## Prerequisites

1. A Paddle account (sign up at https://paddle.com)
2. Access to your Paddle dashboard
3. A verified domain for webhook delivery

## Step 1: Create a Paddle Account

1. Go to https://paddle.com and sign up
2. Complete the verification process
3. Access your Paddle Dashboard

## Step 2: Create a Product and Price

1. In Paddle Dashboard, go to **Catalog > Products**
2. Click **+ New Product**
3. Enter product details:
   - Name: "Vocabulary Builder Premium"
   - Description: "Ad-free experience for Vocabulary Builder"
   - Type: One-time purchase
4. Click **Create**
5. Add a price:
   - Click **+ Add Price**
   - Amount: $5.00 USD
   - Billing type: One-time
6. Copy the **Price ID** (starts with `pri_`) - you'll need this later

## Step 3: Get Your API Credentials

### API Key (Server-side)
1. Go to **Developer Tools > Authentication**
2. Click **Generate API Key**
3. Copy the API key securely
4. This is your `PADDLE_API_KEY`

### Client-side Token
1. Go to **Developer Tools > Authentication**
2. Find your **Client-side Token**
3. Copy this token
4. This is your `PADDLE_CLIENT_TOKEN`

## Step 4: Configure Webhooks

Webhooks ensure subscription status updates even if the user closes their browser before the checkout callback completes.

1. Go to **Developer Tools > Notifications**
2. Click **+ New Destination**
3. Enter your webhook URL: `https://YOUR_DOMAIN/api/webhooks/paddle`
4. Select events to receive:
   - `subscription.created`
   - `subscription.activated`
   - `subscription.updated`
   - `subscription.canceled`
   - `subscription.past_due`
   - `subscription.paused`
5. Click **Save**

### Important: Webhook Firestore Integration

The current webhook handler logs events but requires Firebase Admin SDK to write directly to Firestore. For production, you have two options:

**Option A: Add Firebase Admin SDK (Recommended)**
1. Create a service account in Firebase Console > Project Settings > Service Accounts
2. Download the JSON key file
3. Add `FIREBASE_SERVICE_ACCOUNT` secret with the JSON content
4. Install Firebase Admin SDK: `npm install firebase-admin`
5. Update `server/routes.ts` to initialize Admin SDK and write to Firestore

**Option B: Frontend-Only Updates**
The app already updates Firestore via the frontend after successful checkout. This works for most cases but may miss updates if the user closes the browser immediately after payment.

For development/testing, the frontend callback is sufficient. For production with high reliability requirements, implement Option A.

## Step 5: Add Environment Variables

Add the following secrets to your Replit project:

```
PADDLE_API_KEY=your_api_key_here
PADDLE_CLIENT_TOKEN=your_client_token_here
PADDLE_PRICE_ID=pri_your_price_id_here
PADDLE_ENVIRONMENT=sandbox  # Change to 'production' when going live
```

### Adding Secrets in Replit:
1. Click the "Secrets" tab in the left sidebar
2. Add each key-value pair:
   - `PADDLE_API_KEY` - Your server-side API key
   - `PADDLE_CLIENT_TOKEN` - Your client-side token
   - `PADDLE_PRICE_ID` - The price ID from Step 2
   - `PADDLE_ENVIRONMENT` - Set to `sandbox` for testing, `production` for live

## Step 6: Update AdSense Configuration

The app includes Google AdSense integration. To enable ads:

1. Sign up for AdSense at https://www.google.com/adsense
2. Get your publisher ID (starts with `ca-pub-`)
3. Create ad units in AdSense dashboard
4. Update `client/index.html`:
   - Replace `YOUR_ADSENSE_ID` with your publisher ID
5. Update `client/src/App.tsx` (in the AdBanner component):
   - Replace `ca-pub-YOUR_ADSENSE_ID` with your publisher ID
   - Replace `YOUR_AD_SLOT_ID` with your ad slot ID

## Testing

### Sandbox Testing
1. Use Paddle's sandbox environment first (`PADDLE_ENVIRONMENT=sandbox`)
2. Use test card numbers from Paddle's documentation
3. Verify webhooks are received correctly

### Test Flow
1. Click "Upgrade" button in the app
2. Complete checkout with test card
3. Verify subscription status updates in Firestore
4. Confirm ads are hidden for premium users

## Going Live

When ready for production:

1. Complete Paddle's verification process
2. Change `PADDLE_ENVIRONMENT` to `production`
3. Update webhook URL to production domain
4. Test with real payment method

## Firestore Data Structure

Subscription data is stored at:
```
artifacts/{appId}/users/{userId}/metadata/subscription
```

Fields:
- `isPremium` (boolean) - Whether user has active premium subscription
- `subscriptionId` (string) - Paddle subscription ID
- `customerId` (string) - Paddle customer ID
- `status` (string) - active, canceled, past_due, paused, none
- `priceId` (string) - Paddle price ID
- `currentPeriodEnd` (number) - Unix timestamp of subscription end
- `cancelAtPeriodEnd` (boolean) - Whether subscription will cancel at period end
- `updatedAt` (number) - Last update timestamp

## Troubleshooting

### Checkout Not Opening
- Verify `PADDLE_CLIENT_TOKEN` is correct
- Check browser console for Paddle.js errors
- Ensure `PADDLE_PRICE_ID` exists in your Paddle catalog

### Webhooks Not Received
- Verify webhook URL is publicly accessible
- Check Paddle Dashboard webhook logs for delivery status
- Ensure webhook endpoint returns 200 status

### Subscription Status Not Updating
- Check Firestore security rules allow writes
- Verify webhook handler is processing events
- Check server logs for errors

## Support

- Paddle Documentation: https://developer.paddle.com
- Paddle Support: support@paddle.com
- AdSense Help: https://support.google.com/adsense
