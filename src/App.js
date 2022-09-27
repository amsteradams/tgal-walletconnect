import { useMoralis, useChain } from 'react-moralis';
import './App.css';
import Title from './components/Title';

function App() {
  const {isAuthenticated, authenticate, user, logout} = useMoralis()
  const {chain} = useChain();
  const logoutDapp = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error)
    }
  }
  const walletconnectAuth = async () => {
    try {
      await authenticate({
        provider:"walletconnect",
        signingMessage:"Auth required"
      })
    } catch (error) {
      console.error(error)
    }
  }
  const metamaskConnect = async () => {
    try {
      await authenticate({
        provider:"metamask",
        signingMessage:"Auth required"
      })
    } catch (error) {
      console.error(error);
    }
  }
  console.log(isAuthenticated); //check if a user is authenticated
  if(!isAuthenticated){
  return (
    <div className='App'>
      <Title />
      <p>Wallet connection</p>
      <div id='ctn'>
        <button onClick={walletconnectAuth}><img style={{'background-color':"#00263A"}} src='WalletConnect.svg' alt='walletConnect Icon'/></button>
        <button onClick={metamaskConnect}><img style={{'background-color':"#00263A"}} src='metamask-icon.svg' alt='metamask Icon'/></button>
      </div>
    </div>
  )
  }
  return (
    <div className="App">
      <Title />
      <div id='ctn'>
        <p>Wallet address : {user.get('ethAddress')}</p>
        <p>Chain : {chain ? chain.name : "error to retrieve the chain"}</p>
        <button onClick={logoutDapp}>Log out</button>
      </div>
    </div>
  );
}

export default App;
