import React from "react"
import { createRoot } from "react-dom/client"

// import Suggest from "./components/Suggest"
import LocalGovernmentSuggest from "./components/LocalGovernmentSuggest"

const container = document.getElementById("app")
const root = createRoot(container)

root.render(<LocalGovernmentSuggest />)
