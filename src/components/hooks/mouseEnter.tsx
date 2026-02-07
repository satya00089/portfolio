import React, { createContext, useContext } from "react"

export const MouseEnterContext = createContext<
  readonly [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined)

export const useMouseEnter = () => {
  const context = useContext(MouseEnterContext)
  if (context === undefined) {
    throw new Error("useMouseEnter must be used within a MouseEnterProvider")
  }
  return context
}

export default useMouseEnter
