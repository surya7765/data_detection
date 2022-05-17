import { useState,useContext } from 'react'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import { client } from '../../lib/client'
import {BlogContext} from '../../context/BlogContext'


const style = {
  wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,
  profileImage: `height-12 w-12 rounded-full`,
  inputField: `w-full h-full outline-none bg-transparent text-lg`,
  formLowerContainer: `flex`,
  iconsContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
}

const TweetBox = () => {
  const [tweetMessage, setTweetMessage] = useState('')

  const { currentAccount,currentUser,blogs } =
  useContext(BlogContext)


  const postTweet = async (event) => {
    event.preventDefault()

    if (!tweetMessage) return
    const blogId = `${currentAccount}_${Date.now()}`

    const blogDoc = {
      _type: 'blogs',
      _id: blogId,
      blog: tweetMessage,
      timestamp: new Date(Date.now()).toISOString(),
      author: {
        _key: blogId,
        _ref: currentAccount,
        _type: 'reference',
      },
    }

    await client.createIfNotExists(blogDoc)

    await client
      .patch(currentAccount)
      .setIfMissing({ blogs: [] })
      .insert('after', 'blogs[-1]', [
        {
          _key: blogId,
          _ref: blogId,
          _type: 'reference',
        },
      ])
      .commit()

    setTweetMessage('');
  }

  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <img
          src={currentUser.profileImage}
          className={
            currentUser.isProfileImageNft
              ? `${style.profileImage} smallHex`
              : style.profileImage
          }
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form>
          <textarea
            className={style.inputField}
            placeholder="What's Happening?"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          />
          <div className={style.formLowerContainer}>
            <div className={style.iconsContainer}>
              <BsCardImage className={style.icon} />
              <RiFileGifLine className={style.icon} />
              <RiBarChartHorizontalFill className={style.icon} />
              <BsEmojiSmile className={style.icon} />
              <IoMdCalendar className={style.icon} />
              <MdOutlineLocationOn className={style.icon} />
            </div>
            <button
              type="submit"
              onClick={(e) => postTweet(e)}
              className={`${style.submitGeneral} ${
                tweetMessage ? style.activeSubmit : style.inactiveSubmit
              }`}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetBox
