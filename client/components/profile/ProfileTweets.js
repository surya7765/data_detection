import { useEffect, useContext, useState } from 'react'
import { BlogContext } from '../../context/BlogContext'
import Post from '../Post'

const style = {
  wrapper: `no-scrollbar`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}


const ProfileTweets = () => {


  const { currentUser,currentAccount } = useContext(BlogContext)

  // const [tweets, setTweets] = useState<Blogs>([
  //   {
  //     timestamp: '',
  //     tweet: '',
  //   },
  // ])
  // const [author, setAuthor] = useState<Author>({
  //   name: '',
  //   profileImage: '',
  //   walletAddress: '',
  //   isProfileImageNft: undefined,
  // })

  // useEffect(() => {
  //   if (!currentUser) return

  //   setTweets(currentUser.blogs)
  //   setAuthor({
  //     name: currentUser.name,
  //     profileImage: currentUser.profileImage,
  //     walletAddress: currentUser.walletAddress,
  //     isProfileImageNft: currentUser.isProfileImageNft,
  //   })
  // }, [currentUser])

  console.log(currentUser);

  return (
    <div className={style.wrapper}>
      {currentUser.blogs?.map((blog, index) => (
        console.log(blog),
        <Post
          key={index}
          displayName={
            currentUser.name === 'Unnamed'
              ? `${currentUser.walletAddress.slice(
                  0,
                  4,
                )}...${currentUser.walletAddress.slice(41)}`
              : currentUser.name
          }
          userName={`${currentUser.walletAddress.slice(
            0,
            4,
          )}...${currentUser.walletAddress.slice(41)}`}
          text={blog.blog}
          avatar={currentUser.profileImage}
          timestamp={blog.timestamp}
          isProfileImageNft={currentUser.isProfileImageNft}
        />
      ))}
    </div>
  )
}

export default ProfileTweets