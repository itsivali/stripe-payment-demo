import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './components/PaymentForm';
import axios from 'axios';

jest.mock('axios');
jest.mock('@stripe/stripe-js');

const mockStripe = {
  confirmCardPayment: jest.fn(),
  elements: jest.fn()
};

describe('PaymentForm', () => {
  beforeEach(() => {
    loadStripe.mockResolvedValue(mockStripe);
  });

  test('handles successful payment submission', async () => {
    axios.post.mockResolvedValue({ data: { clientSecret: 'test_secret' } });
    mockStripe.confirmCardPayment.mockResolvedValue({
      paymentIntent: { status: 'succeeded' }
    });

    render(
      <Elements stripe={loadStripe('test_key')}>
        <PaymentForm />
      </Elements>
    );

    const amountInput = screen.getByLabelText(/amount/i);
    await userEvent.type(amountInput, '1000');

    const submitButton = screen.getByRole('button', { name: /pay/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/payment successful/i)).toBeInTheDocument();
    });
  });

  test('displays error for invalid amount', async () => {
    render(
      <Elements stripe={loadStripe('test_key')}>
        <PaymentForm />
      </Elements>
    );

    const submitButton = screen.getByRole('button', { name: /pay/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please enter a valid amount/i)).toBeInTheDocument();
  });

  test('displays loading state during payment processing', async () => {
    axios.post.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(
      <Elements stripe={loadStripe('test_key')}>
        <PaymentForm />
      </Elements>
    );

    const amountInput = screen.getByLabelText(/amount/i);
    await userEvent.type(amountInput, '1000');

    const submitButton = screen.getByRole('button', { name: /pay/i });
    fireEvent.click(submitButton);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });
});
