import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './components/Main';
import {URIGRAPHQL} from './apollo/client'

test('renders learn react link', () => {
  render(<App URIGRAPHQL={URIGRAPHQL}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
