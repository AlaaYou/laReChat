import ChatLayout from '@/Layouts/ChatLayout';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

function Home({ selectedConversation = null, messages = null }) {
    return (
        <AuthenticatedLayout>
            <ChatLayout
                selectedConversation={selectedConversation}
                messages={messages}
            />
        </AuthenticatedLayout>
    );
}

Home.layout = (page) => (
    <AuthenticatedLayout user={page.props.auth.user}>
        <ChatLayout children={page} />
    </AuthenticatedLayout>
);

export default Home;
