import { createGlobalStyle } from "styled-components";
import { Provider } from 'react-redux';
import { store } from './store/store'
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
    return (
      <Provider store={store}>
        <GlobalStyle />
        <Header />
        <Main />
      </Provider>
  )
}

const GlobalStyle = createGlobalStyle`
  html {
    font-size: 10px;
  }

  body {
    font-family: "Inter", sans-serif;
		font-weight: 500;
		font-size: max(1.6rem, 12px);
		color: #4E148C;
  }
  .container {
		max-width: 727px;
		margin: 0 auto;
		padding: 0 30px;
	}

  @media (max-width: 670px) {
		html {
			font-size: 1px;
		}

		.container {
			padding: 0 15px;
		}
	}

`;

export default App;
