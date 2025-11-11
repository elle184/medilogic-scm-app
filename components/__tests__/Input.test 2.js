import React from 'react';
import { render, screen } from '@testing-library/react-native';
import Input from '../Input';

describe('Input Component', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <Input label="Test Label" textInputConfig={{ placeholder: 'Test' }} />
    );
    expect(getByText('Test Label')).toBeTruthy();
  });

  it('should render with the correct label', () => {
    const { getByText } = render(
      <Input label="Email Address" textInputConfig={{}} />
    );
    expect(getByText('Email Address')).toBeTruthy();
  });

  it('should render TextInput with provided config', () => {
    const { getByPlaceholderText } = render(
      <Input 
        label="Name" 
        textInputConfig={{ 
          placeholder: 'Enter your name',
          keyboardType: 'default'
        }} 
      />
    );
    expect(getByPlaceholderText('Enter your name')).toBeTruthy();
  });

  it('should pass through all textInputConfig props', () => {
    const onChangeText = jest.fn();
    const { getByDisplayValue } = render(
      <Input 
        label="Test" 
        textInputConfig={{ 
          value: 'Initial Value',
          onChangeText
        }} 
      />
    );
    expect(getByDisplayValue('Initial Value')).toBeTruthy();
  });

  it('should render with numeric keyboard type', () => {
    const { getByPlaceholderText } = render(
      <Input 
        label="Phone" 
        textInputConfig={{ 
          keyboardType: 'numeric',
          placeholder: 'Phone number'
        }} 
      />
    );
    const input = getByPlaceholderText('Phone number');
    expect(input.props.keyboardType).toBe('numeric');
  });

  it('should render with email keyboard type', () => {
    const { getByPlaceholderText } = render(
      <Input 
        label="Email" 
        textInputConfig={{ 
          keyboardType: 'email-address',
          placeholder: 'Email'
        }} 
      />
    );
    const input = getByPlaceholderText('Email');
    expect(input.props.keyboardType).toBe('email-address');
  });

  it('should render without crashing when textInputConfig is empty', () => {
    const { getByText } = render(
      <Input label="Empty Config" textInputConfig={{}} />
    );
    expect(getByText('Empty Config')).toBeTruthy();
  });
});

