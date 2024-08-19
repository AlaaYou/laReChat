import { Link } from "@inertiajs/react";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import UserAvatar from "./UserAvatar";
import GroupAvatar from "./GroupAvatar";

const ConversationHeader = ({ selectedConversation }) => {
    return (
        <>
            {selectedConversation && (
                <div className="sticky top-0 z-10 p-1 flex justify-between items-center border-y-2 border-slate-700 bg-slate-800">
                    <div className="flex items-center gap-3">
                        {/* Back button for small screens */}
                        <Link 
                            href={route("dashboard")}
                            className="inline-block sm:hidden"
                        >
                            <ArrowLeftIcon className="w-6 h-6 text-gray-400 hover:text-gray-200" />
                        </Link>
                        {selectedConversation.is_user && (
                            <UserAvatar user={selectedConversation} />
                        )}
                        {selectedConversation.is_group && <GroupAvatar />}
                        <div>
                            <h3 className="text-lg font-semibold">
                                {selectedConversation.name}
                            </h3>
                            {selectedConversation.is_group && (
                                <p className="text-xs text-gray-500">
                                    {selectedConversation.users.length} members
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ConversationHeader;