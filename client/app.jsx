import React from 'react';
import PageContainer from './components/page-container';
import Home from './pages/home';

export default class App extends React.Component {
  render() {
    return (
      <PageContainer >
        <Home />
      </PageContainer>
    );
  }
}
