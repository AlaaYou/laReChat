import {UsersIcon} from "@heroicons/react/24/solid/index.js";

const GroupAvatar = ()  => {
    return (
        <>
            <div className={`avatar placeholder`}>
                <div className={`rounded-full bg-gray-400 text-gray-800 w-8`}>
                        <span className="text-xl">
                           <UsersIcon className={"w-4"}/>
                        </span>
                </div>
            </div>
        </>
    );
}

export default GroupAvatar;
