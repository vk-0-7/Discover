// import '../styles/globals.css'

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

import React, { useEffect ,useState} from 'react';
import {Provider} from 'react-redux'
import store from './redux/store'
import '../styles/globals.css'
import Script from 'next/script'
import TagManager from 'react-gtm-module';

export const MyContext = React.createContext()

function App({ Component, pageProps }) {

  const [globalState, setGlobalState] = useState()

  useEffect(() => {
      TagManager.initialize({ gtmId: 'GTM-N8T8ZQV' });



      var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
(function(){
var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
s1.async=true;
s1.src='https://embed.tawk.to/63b70cac47425128790be185/1gm1gj1kp';
s1.charset='UTF-8';
s1.setAttribute('crossorigin','*');
s0.parentNode.insertBefore(s1,s0);
})();


  }, []);
  return(<>
   <Provider store={store}>
            <Component {...pageProps} />
        </Provider>
    </>
    )
}
export default App