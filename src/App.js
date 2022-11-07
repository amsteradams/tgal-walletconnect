import { useMoralis, useChain } from 'react-moralis';
import './App.css';
import Title from './components/Title';
import { useNFTBalances } from "react-moralis";


function App() {
  const { getNFTBalances, data, error, isLoading, isFetching } = useNFTBalances();
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
      alert(error)
    }
  }
  const metamaskConnect = async () => {
    if (typeof window.ethereum !== 'undefined') {
    try {
      await authenticate({
        provider:"metamask",
        signingMessage:"Auth required"
      })
    } catch (error) {
      console.error(error);
    }
  }else{
    window.location.replace('https://metamask.io/download/');
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
  }else{
  return (
    <div className="App">
      <Title />
      <p id='address'>{user.get('ethAddress').slice(0,10)}...</p>
      <div id='ctn'>
           Nft balance :{data !== null ? data.total : ""} 
      </div>
      <button id='logout' onClick={logoutDapp}>logout</button>
        {/* <p>Wallet address : {user.get('ethAddress')}</p>
        <p>Chain : {chain ? chain.name : "error to retrieve the chain"}</p>
        <button onClick={logoutDapp}>Log out</button> */}
    </div>
  );
}
}

export default App;
