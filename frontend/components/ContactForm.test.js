import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
render(<ContactForm />);
});

test('renders the contact form header', () => {
    render(<ContactForm />);
    const header = screen.getByText(/contact form/i);
    expect(header).toBeInTheDocument();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    userEvent.type(firstName, 'Edd');
    const nameError = screen.getByText(/firstname must have at least 5 characters/i);
    expect(nameError).toBeInTheDocument;
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    userEvent.type(firstName, "");
    userEvent.type(lastName, "");
    userEvent.type(email, "");
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    const firstNameError = screen.getByText(/firstname must have at least 5 characters/i);
    const lastNameError = screen.getByText(/lastName is a required field./i);
    const emailInputError = screen.getByText(/email must be a valid email address./i);
    expect(firstNameError).toBeInTheDocument() && expect(lastNameError).toBeInTheDocument() && expect(emailInputError).toBeInTheDocument();
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    userEvent.type(firstName, "LisaM");
    userEvent.type(lastName, "DeSpain");
    userEvent.type(email, "");
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    const emailInputError = screen.getByText(/email must be a valid email address./i);
    expect(emailInputError).toBeInTheDocument();
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
    render(<ContactForm />);
    const email = screen.getByLabelText(/email/i);
    userEvent.type(email, "lisa");
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    const emailInputError = screen.getByText(/email must be a valid email address./i);
    expect(emailInputError).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
    render(<ContactForm />);
    const lastName = screen.getByLabelText(/last name/i);
    userEvent.type(lastName, "");
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    const lastNameError = screen.getByText(/lastName is a required field/i);
    expect(lastNameError).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const messageText = screen.getByLabelText(/message/i);
    const message = "";
    
    userEvent.type(firstName, "LisaM");
    userEvent.type(lastName, "DeSpain");
    userEvent.type(email, "ldespain@cox.net");
    userEvent.type(messageText, message);
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  
});

test('renders all fields text when all fields are submitted.', async () => {
    render(<ContactForm />);
    const firstName = screen.getByLabelText(/first name/i);
    const lastName = screen.getByLabelText(/last name/i);
    const email = screen.getByLabelText(/email/i);
    const messageText = screen.getByLabelText(/message/i);
        
    userEvent.type(firstName, "LisaM");
    userEvent.type(lastName, "DeSpain");
    userEvent.type(email, "ldespain@cox.net");
    userEvent.type(messageText, "This is a message!");
    const submitButton = screen.getByRole("button");
    userEvent.click(submitButton);
    
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(messageText).toBeInTheDocument();
});
