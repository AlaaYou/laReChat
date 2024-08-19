const UserAvatar = ({user, online = null, profile = false})  => {
    let onlineClass = online === true ? " online" : online === false ? " offline" : ""
    const sizeClass = profile ? "w-40" : "w-8"
    return (
        <>
        {user.avatar_url && (
            <div className={`chat-image avatar ${onlineClass}`}>
                <div className={`rounded-full ${sizeClass}`}>
                    <img src={user.avatar_url}/>
                </div>
            </div>
        )}
        {!user.avatar_url && (
            <div className={`chat-image placeholder avatar ${onlineClass}`}>
        <div className={`bg-neutral rounded-full  ${sizeClass}`}>
                        <span className="text-xl">
                            {user.name.substring(0, 1)}
                        </span>
        </div>
        </div>
    )
}

</>
)
    ;
}

export default UserAvatar;
