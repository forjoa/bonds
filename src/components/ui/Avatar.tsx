interface AvatarProps {
  profilephoto: string | null
  username: string
}

export default function Avatar({ profilephoto, username }: AvatarProps) {
  return (
    <img
      src={profilephoto === null ? '/defaultavatar.jpg' : profilephoto}
      alt={`${username}'s profile photo`}
    />
  )
}
