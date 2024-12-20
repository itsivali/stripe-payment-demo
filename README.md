# Stripe Payment Demo

A React application demonstrating Stripe payment integration with a Node.js backend.

---

## Setup

### Environment Variables

Set up environment variables by creating a `.env` file in the `stripe-backend` directory and adding the following:

```env
STRIPE_SECRET_KEY=<your_stripe_secret_key>
PORT=5000
```

For the frontend, include your Stripe publishable key in an environment variable:

```env
REACT_APP_STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
```

### Test Card Numbers

Use these test card numbers for payments:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **Authentication Required**: `4000 0025 0000 3155`

#### Card Details:
- Expiry Date: Any future date (e.g., 12/34)
- CVC: Any 3-digit number (e.g., 123)
- Postal Code: Any valid postal code

---

## Available Scripts

### Frontend
To start the frontend React application:

```bash
npm start
```

### Backend
To start the backend Node.js server:

```bash
cd stripe-backend
node server.js
```

---

## API Endpoints

### `POST /create-payment-intent`
Creates a payment intent for processing card payments.

#### Request Body:
```json
{
  "amount": 5000,  // Amount in smallest currency unit (e.g., cents for KES)
  "currency": "kes"
}
```

#### Response:
```json
{
  "clientSecret": "<payment_intent_client_secret>",
  "status": "requires_payment_method"
}
```

---

## Testing

### Run Tests in Watch Mode:
```bash
npm test
```

### Run Tests with Coverage:
```bash
npm test -- --coverage
```

---

## Installation Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies for both the frontend and backend:
   ```bash
   npm install
   cd stripe-backend && npm install
   ```

3. Start the backend server:
   ```bash
   node server.js
   ```

4. Start the frontend application:
   ```bash
   npm start
   ```

5. Open the application in your browser at `http://localhost:3000`.

---

## Environment Variables

### Frontend:
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key

### Backend:
- `STRIPE_SECRET_KEY`: Your Stripe secret key
- `PORT`: Server port (default: 5000)
