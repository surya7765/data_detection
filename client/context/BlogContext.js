import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { client } from '../lib/client'

export const BlogContext = createContext()

export const BlogProvider = ({ children }) => {
  const [appStatus, setAppStatus] = useState('loading')
  const [currentAccount, setCurrentAccount] = useState('')
  const [currentUser, setCurrentUser] = useState({})
  const [blogs, setBlogs] = useState([])
  const router = useRouter()

  useEffect(() => {
    CheckIfWalletIsLoggedIn()
  }, [])

  useEffect(() => {
    if (!currentAccount && appStatus == 'connected') return
    getCurrentUserDetails(currentAccount)
    fetchBlogs()
  }, [currentAccount, appStatus])

  const getNftProfileImage = async (imageUri, isNft) => {
    if (isNft) {
      return `https://gateway.pinata.cloud/ipfs/${imageUri}`
    } else if (!isNft) {
      return imageUri
    }
  }

  const fetchBlogs = async () => {
    const query = `
      *[_type == "blogs"]{
        "author": author->{name, walletAddress, profileImage, isProfileImageNft},
        blog,
        timestamp
      }|order(timestamp desc)
    `

    const sanityResponse = await client.fetch(query)
    setBlogs([])

    sanityResponse.forEach(async (items) => {
      const profileImageUrl = await getNftProfileImage(
        items.author.profileImage,
        items.author.isProfileImageNft
      )
      // console.log(items)

      if (items.author.isProfileImageNft) {
        const newItem = {
          blog: items.blog,
          timestamp: items.timestamp,
          author: {
            name: items.author.name,
            walletAddress: items.author.walletAddress,
            profileImage: profileImageUrl,
            isProfileImageNft: items.author.isProfileImageNft,
          },
        }

        setBlogs((prevState) => [...prevState, newItem])
      } else {
        setBlogs((prevState) => [...prevState, items])
      }
    })
  }

  const CheckIfWalletIsLoggedIn = async () => {
    if (!window.ethereum) return
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      })
      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (error) {
      router.push('/')
      setAppStatus('error')
    }
  }

  /**
   * Initiates MetaMask wallet connection
   */
  const connectWallet = async () => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      setAppStatus('loading')
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      if (addressArray.length > 0) {
        setAppStatus('connected')
        setCurrentAccount(addressArray[0])
        createUserAccount(addressArray[0])
      } else {
        router.push('/')
        setAppStatus('notConnected')
      }
    } catch (err) {
      setAppStatus('error')
    }
  }

  /**
   * Creates an account in Sanity DB if the user does not already have one
   * @param {String} userAddress Wallet address of the currently logged in user
   */
  const createUserAccount = async (userAddress = currentAccount) => {
    if (!window.ethereum) return setAppStatus('noMetaMask')
    try {
      const userDoc = {
        _type: 'users',
        _id: userAddress,
        name: 'Unnamed',
        isProfileImageNft: false,
        profileImage:
          'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
        walletAddress: userAddress,
      }

      await client.createIfNotExists(userDoc)

      setAppStatus('connected')
    } catch (error) {
      router.push('/')
      setAppStatus('error')
    }
  }

  /**
   * Gets the current user details from Sanity DB.
   * @param {String} userAccount Wallet address of the currently logged in user
   * @returns null
   */
  const getCurrentUserDetails = async (userAccount = currentAccount) => {
    if (appStatus !== 'connected') return
    // console.log(userAccount)
    const query = `
      *[_type == "users" && _id == "${userAccount}"]{
        "blogs": blogs[]->{timestamp, blog}|order(timestamp desc),
        name,
        profileImage,
        isProfileImageNft,
        coverImage,
        walletAddress
      }
    `
    const response = await client.fetch(query)
    console.log(response)
    const profileImageUri = await getNftProfileImage(
      response[0].profileImage,
      response[0].isProfileImageNft
    )

    setCurrentUser({
      blogs: response[0].blogs,
      name: response[0].name,
      profileImage: profileImageUri,
      walletAddress: response[0].walletAddress,
      coverImage: response[0].coverImage,
      isProfileImageNft: response[0].isProfileImageNft,
    })
  }

  return (
    <BlogContext.Provider
      value={{
        appStatus,
        currentAccount,
        connectWallet,
        fetchBlogs,
        getNftProfileImage,
        setAppStatus,
        blogs,
        currentUser,
        getCurrentUserDetails,
      }}
    >
      {children}
    </BlogContext.Provider>
  )
}
