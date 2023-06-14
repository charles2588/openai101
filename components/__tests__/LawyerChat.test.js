import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import LawyerChat from '../LawyerChat';

jest.mock('axios');

describe('LawyerChat', () => {
    it('should send user input and display bot response', async () => {
        const userInput = 'Hello, I need legal advice.';
        const mockResponse = {
            data: {
                result: 'Hello! How can I assist you with your legal needs?',
            },
        };

        axios.post.mockResolvedValueOnce(mockResponse);

        render(<LawyerChat />);

        const inputElement = screen.getByRole('textbox');
        const sendButton = screen.getByText('Send');

        fireEvent.change(inputElement, { target: { value: userInput } });
        fireEvent.click(sendButton);

        const userMessage = screen.getByText(userInput);
        const botResponse = await screen.findByText(mockResponse.data.result);

        expect(userMessage).toBeInTheDocument();
        expect(botResponse).toBeInTheDocument();
    });

    it('should handle API error and display error message', async () => {
        const userInput = 'Hello, I need legal advice.';
        const mockError = new Error('API request failed');

        axios.post.mockRejectedValueOnce(mockError);

        render(<LawyerChat />);

        const inputElement = screen.getByRole('textbox');
        const sendButton = screen.getByText('Send');

        fireEvent.change(inputElement, { target: { value: userInput } });
        fireEvent.click(sendButton);

        const userMessage = screen.getByText(userInput);
        const errorMessage = await screen.findByText('Error sending message');

        expect(userMessage).toBeInTheDocument();
        expect(errorMessage).toBeInTheDocument();
    });
});