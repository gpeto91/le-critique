import { ProviderType } from "next-auth/providers"
import { createContext, Dispatch, FC, SetStateAction, useState } from "react"

type AppType = {
  providers: ProviderType | null
}

type PropsAppContext = {
  state: AppType,
  setState: Dispatch<SetStateAction<AppType>>
}

const DEFAULT_VALUE: PropsAppContext = {
  state: {
    providers: null
  },
  setState: () => {}
}

const AppContext = createContext<PropsAppContext>(DEFAULT_VALUE)

const AppContextProvider: FC = ({ children }) => {
  const [state, setState] = useState(DEFAULT_VALUE.state)

  return (
    <AppContext.Provider
      value={{
        state,
        setState,
      }}
    >
      { children }
    </AppContext.Provider>
  )
}

export { AppContextProvider }
export default AppContext