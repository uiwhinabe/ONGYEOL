import { createContext, useContext } from 'react'

export const MyPageContext = createContext(null)
export const useMyPage = () => useContext(MyPageContext)

