import React from "react"
import { createRoot } from "react-dom/client"

// import Suggest from "./components/Suggest"
import AutosuggestExample from "./components/AutosuggestExample"

const container = document.getElementById("app")
const root = createRoot(container)

root.render(<AutosuggestExample />)
