import React from "react"
import { createRoot } from "react-dom/client"

import Suggest from "./components/Suggest"

const container = document.getElementById("app")
const root = createRoot(container)

root.render(<Suggest />)
