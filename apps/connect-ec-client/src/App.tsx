import { useEffect, useState } from 'react'
import './App.css'

import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";

import { ElizaService } from "@repo/connect_gen/eliza"

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

const client = createPromiseClient(ElizaService, transport);
function App() {
  const [sentence, setSentence] = useState("")

  useEffect(() => {
    (async () => {
      const res = await client.say({
        sentence: "I feel happy.",
      });
      console.log(res.sentence);
      setSentence(res.sentence)
    })()
  }, [])

  return (
    <>
      <h1>{sentence}</h1>
    </>
  )
}

export default App
