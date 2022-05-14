import Link from 'next/link'
import { FiMoreHorizontal } from 'react-icons/fi'
import { BsChatQuote } from 'react-icons/bs'
import SidebarOption from './SidebarOption'
import { useState, useContext } from 'react'
import { RiHome7Line, RiHome7Fill, RiFileList2Fill } from 'react-icons/ri'
import { BiHash } from 'react-icons/bi'
import { FaRegListAlt, FaHashtag, FaBell } from 'react-icons/fa'
import { HiOutlineMail, HiMail } from 'react-icons/hi'
import { CgMoreO } from 'react-icons/cg'
import { BsPerson, BsPersonFill } from 'react-icons/bs'
import { useRouter } from 'next/router'
import { BlogContext } from '../context/BlogContext'
import Modal from 'react-modal'
import ProfileImageMinter from './mintingModal/ProfileImageMinter'
import { customStyles } from '../lib/constants'

const style = {
  wrapper: `flex-[0.1] px-2 flex flex-col`,
  twitterIconContainer: `text-3xl m-4`,
  tweetButton: `bg-[#1d9bf0] hover:bg-[#1b8cd8] flex items-center justify-center font-bold rounded-3xl h-[50px] mt-[20px] cursor-pointer`,
  navContainer: `flex-1`,
  profileButton: `flex items-center mb-6 cursor-pointer hover:bg-[#333c45] rounded-[100px] p-2`,
  profileLeft: `flex item-center justify-center mr-4`,
  profileImage: `height-12 w-12 rounded-full`,
  profileRight: `flex-1 flex`,
  details: `flex-1`,
  name: `text-lg`,
  handle: `text-[#8899a6]`,
  moreContainer: `flex items-center mr-2`,
}

function Sidebar({ initialselectedIcon = 'Home' }) {
  const [selected, setselected] = useState(initialselectedIcon)
  const { currentAccount, currentUser } = useContext(BlogContext)
  const router = useRouter()
  console.log(currentUser.profileImage)
  return (
    <div className={style.wrapper}>
      <div className={style.twitterIconContainer}>
        <BsChatQuote />
        <SidebarOption
          Icon={selected === 'Home' ? RiHome7Fill : RiHome7Line}
          text="Home"
          isActive={Boolean(selected === 'Home')}
          setSelected={setselected}
          redirect={'/'}
        />
        <SidebarOption
          Icon={selected === 'Explore' ? FaHashtag : BiHash}
          text="Explore"
          isActive={Boolean(selected === 'Explore')}
          setSelected={setselected}
        />
        <SidebarOption
          Icon={selected === 'Messages' ? HiMail : HiOutlineMail}
          text="Messages"
          isActive={Boolean(selected === 'Messages')}
          setSelected={setselected}
        />
        <SidebarOption
          Icon={selected === 'Profile' ? BsPersonFill : BsPerson}
          text="Profile"
          isActive={Boolean(selected === 'Profile')}
          setSelected={setselected}
          redirect={'/Profile'}
        />
        <SidebarOption Icon={CgMoreO} text="More" setSelected={setselected} />

        <div
          className={style.tweetButton}
          onClick={() =>
            router.push(`${router.pathname}/?mint=${currentAccount}`)
          }
        >
          Mint
        </div>
      </div>
      <div className={style.profileButton}>
        <div className={style.profileLeft}>
          <img
            src={currentUser.profileImage}
            alt="profile"
            className={
              currentUser.isProfileImageNft
                ? `${style.profileImage} smallHex`
                : style.profileImage
            }
          />
        </div>
        <div className={style.profileRight}>
          <div className={style.details}>
            <div className={style.name}>{currentUser.name}</div>
            <div className={style.handle}>
              @{currentAccount.slice(0, 6)}...{currentAccount.slice(39)}
            </div>
          </div>
          <div className={style.moreContainer}>
            <FiMoreHorizontal />
          </div>
        </div>
      </div>
      <Modal
        isOpen={Boolean(router.query.mint)}
        onRequestClose={() => router.back()}
        ariaHideApp={false}
        style={customStyles}
      >
        <ProfileImageMinter />
      </Modal>
    </div>
  )
}

export default Sidebar
