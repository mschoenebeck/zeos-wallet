import * as React from 'react'
import { useState, useEffect } from 'react'

import { Ledger } from 'ual-ledger'
import { Lynx } from 'ual-lynx'
//import { Scatter } from 'ual-scatter'
import { Anchor } from 'ual-anchor'
import { UALProvider, withUAL } from 'ual-reactjs-renderer'

import { JsonRpc } from 'eosjs'

import ZEOSWallet from './ZEOSWallet'

const kylinTestnet = {
    chainId: "5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191",
    rpcEndpoints: [{
      protocol: "http",
      host: "kylin.eosn.io",
      port: 80,
    }]
  }

function App()
{
  
  // reads a file selected by file input field 
  // source: https://stackoverflow.com/questions/32215538/using-filereader-readasarraybuffer-on-changed-files-in-firefox
  function readFile(id)
  {
    var input = document.getElementById(id);
  
    if(input.files.length === 0)
    {
      alert('No params file selected');
      return;
    }
  
    var fr = new FileReader();
    
    fr.onload = async function() {
      var data = fr.result;
      var array = new Uint8Array(data);
      //console.log(array);
      if(id == 'MintParams')
      {
        var sk = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31])

        var tx = {
          txtype: 1,
          epk_s: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          sender: {
            change: {
              quantity: {
                amount: 100000,
                symbol: 357812230660
              },
              rho: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
            },
            esk_r: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
          },
          epk_r: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          receiver: {
            notes: [{ quantity: { amount: 100000, symbol: 357812230660 }, rho: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] },
                    { quantity: { amount: 200000, symbol: 357812230660 }, rho: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31] }],
            memo: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
          }
        }
        //console.log(JSON.stringify(tx))
        //console.log(await zeos_generate_mint_proof(array, sk, JSON.stringify(tx)))

        var enc_tx = {
          epk_s: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          ciphertext_s: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                         [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                         [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]],
          epk_r: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
          ciphertext_r: [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                         [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
                         [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]]
        }
        console.log(JSON.stringify(enc_tx))
        console.log(await zeos_decrypt_transaction(sk, JSON.stringify(enc_tx)))
      }
    };
    fr.readAsArrayBuffer(input.files[0]);
  }


  ZEOSWallet.displayName = 'ZEOSWallet'
  const ZEOSWalletUAL = withUAL(ZEOSWallet)
  ZEOSWalletUAL.displayName = 'ZEOSWalletUAL'

  const appName = 'My App'
  const lynx = new Lynx([kylinTestnet])
  const ledger = new Ledger([kylinTestnet])
  //const scatter = new Scatter([kylinTestnet], { appName })
  const anchor = new Anchor([kylinTestnet], { appName })
  
  return (
    <div>
      <table>
        <thead><tr><th colSpan='2' align='left'>Parameter Files</th></tr></thead>
        <tbody>
          <tr><td align='right'>Mint Params:</td><td><input type='file' id='MintParams' /></td></tr>
          <tr><td align='right'>Transfer Params:</td><td><input type='file' id='TransferParams' /></td></tr>
          <tr><td align='right'>Burn Params:</td><td><input type='file' id='BurnParams' /></td></tr>
          <tr><td><button onClick={()=>zeos_generate_mint_proof('wasm')}>Test Execute</button></td><td><button onClick={()=>readFile('MintParams')}>Test ReadFile</button></td></tr>
        </tbody>
      </table>
      <UALProvider chains={[kylinTestnet]} authenticators={[ledger, lynx, /*scatter,*/ anchor]} appName={'My App'}>
          <ZEOSWalletUAL rpc={new JsonRpc(`${kylinTestnet.rpcEndpoints[0].protocol}://${kylinTestnet.rpcEndpoints[0].host}:${kylinTestnet.rpcEndpoints[0].port}`)} />
      </UALProvider>
      <UALProvider chains={[kylinTestnet]} authenticators={[ledger, lynx, /*scatter,*/ anchor]} appName={'My App'}>
          <ZEOSWalletUAL rpc={new JsonRpc(`${kylinTestnet.rpcEndpoints[0].protocol}://${kylinTestnet.rpcEndpoints[0].host}:${kylinTestnet.rpcEndpoints[0].port}`)} />
      </UALProvider>
    </div>
  )
}

export default App