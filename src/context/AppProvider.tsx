import { ProviderType } from "next-auth/providers"
import { getProviders } from "next-auth/react"
import { createContext, Dispatch, FC, SetStateAction, useState } from "react"

export interface IProvider {
  id: string,
  name: string,
  type: string,
}

type AppType = {
  providers: IProvider[]
}

type PropsAppContext = {
  state: AppType,
  setState: Dispatch<SetStateAction<AppType>>
}

const DEFAULT_VALUE: PropsAppContext = {
  state: {
    providers: []
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